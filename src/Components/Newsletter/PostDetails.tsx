import { Grid, makeStyles, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { Dispatch, useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Button from "../formComponents/Button";
import Popup from "../Popup";
import { deleteBlog, updateBlog } from "./blogSlice";
import CommentCard from "./CommentCard";
import { fetchComments } from "./commentSlice";
import { BlogPost } from "./NewsletterPage";

const useStyles = makeStyles((customTheme) => ({
  root: {
    width: "100ch",
    padding: customTheme.spacing(1),

    textAlign: "center",
  },
  textField: {
    justifyContent: "center",
    alignItems: "center",
    padding: customTheme.spacing(1),
  },
  commentsHeading: {
    textAlign: "left",
    padding: customTheme.spacing(2),
    color: customTheme.palette.primary.main,
  },
  commentCardStyle: {
    padding: customTheme.spacing(1),
  },
}));

export interface Comment {
  id: number;
  postId: number;
  name: string;
  body: string;
  email: string;
}
interface StateAndDispatchProps {
  onFetchComments: (blogID: number) => void;
  onDelete: (blogID: number) => void;
  onUpdate: (blog: BlogPost) => void;
  comments: Comment[];
}
interface Props {
  blogPost: BlogPost;
  setOpenForm: any;
  fetchURL: string;
  setBlogPost: Dispatch<React.SetStateAction<BlogPost | undefined>>;
}
const mapStateToProps = (state: RootState) => {
  return {
    comments: state.comments,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onFetchComments: (blogID: number) => dispatch(fetchComments(blogID)),
    onDelete: (blogID: number) => dispatch(deleteBlog(blogID)),
    onUpdate: (blog: BlogPost) => dispatch(updateBlog(blog)),
  };
};

function PostDetails({
  blogPost,
  setOpenForm,
  setBlogPost,
  onFetchComments,
  onDelete,
  onUpdate,
  comments,
}: Props & StateAndDispatchProps) {
  const [selectedCommentData, setSelectedCommentData] = useState<Comment>();
  const [openFullComent, setOpenFullComment] = useState<boolean>(false);

  const handleBlogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({
      ...blogPost,
      [event.target.name]: event.target.value as string,
    });
  };

  useEffect(() => {
    onFetchComments(blogPost.id);
  }, []);

  const deletePost = (postId: number) => {
    try {
      onDelete(postId);
      setOpenForm(false);
      alert("POST SUCCESFULLY DELETED");
    } catch (error) {
      console.log(error);
    }
  };
  const openCommentPopup = (item: Comment) => {
    setSelectedCommentData(item);
    setOpenFullComment(true);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form autoComplete="off">
        <Grid container>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              fullWidth
              rowsMax={4}
              name="title"
              value={blogPost.title}
              defaultValue={blogPost.title}
              onChange={handleBlogChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              id="outlined-multiline-flexible"
              label="Blog Text"
              multiline
              fullWidth
              rowsMax={4}
              rows={4}
              name="body"
              value={blogPost.body}
              defaultValue={blogPost.body}
              onChange={handleBlogChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              text="UPDATE POST"
              onClick={() => onUpdate(blogPost)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              text="REMOVE POST"
              color="secondary"
              onClick={() => deletePost(blogPost.id)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              text="CLOSE WINDOW"
              color="secondary"
              variant="outlined"
              onClick={() => setOpenForm(false)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.commentsHeading}
              variant="h5"
              gutterBottom
            >
              Comments:
            </Typography>
          </Grid>
          {comments?.map((item: Comment) => (
            <Grid
              item
              xs={6}
              key={item.id}
              className={classes.commentCardStyle}
            >
              <CommentCard
                onClick={() => openCommentPopup(item)}
                comment={item}
                isFullBody={false}
              />
            </Grid>
          ))}
        </Grid>
        <Popup openForm={openFullComent} title={selectedCommentData?.name}>
          {selectedCommentData && (
            <CommentCard
              comment={selectedCommentData}
              isFullBody={true}
              onClick={() => setOpenFullComment(false)}
            />
          )}
        </Popup>
      </form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
