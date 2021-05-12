import { Grid, makeStyles, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { Dispatch, useEffect, useState } from "react";
import Button from "../formComponents/Button";
import CommentCard from "./CommentCard";
import { BlogPost } from "./NewsletterPage";
import axios from "axios";
import Popup from "../Popup";

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
export default function PostDetails({
  blogPost,
  setOpenForm,
  fetchURL,
  setBlogPost,
}: {
  blogPost: BlogPost;
  setOpenForm: any;
  fetchURL: string;
  setBlogPost: Dispatch<React.SetStateAction<BlogPost | undefined>>;
}) {
  // const  = props;
  const [data, setData] = useState<Comment[]>([]);
  const [commentData, setCommentData] = useState<Comment>();
  const [openFullComent, setOpenFullComment] = useState<boolean>(false);

  const handleBlogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost({
      ...blogPost,
      [event.target.name]: event.target.value as string,
    });
  };

  async function getData() {
    try {
      const res = await axios.get<Comment[]>(
        `${fetchURL}/${blogPost.id}/comments`
      );
      const data = await res.data;
      setData(data);
      console.log("Data fetched successfully");
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const deletePost = async (postId: number) => {
    try {
      const res = await axios.delete(`${fetchURL}/${postId}`, {
        method: "DELETE",
      });
      console.log("succesfully deleted", res);
      setOpenForm(false);
      alert("POST SUCCESFULLY DELETED");
    } catch (error) {
      console.log(error.response);
    }
  };
  const updatePost = async (blogUpdated: BlogPost) => {
    try {
      const res = await axios.put<BlogPost>(
        `${fetchURL}/${blogPost?.id}`,
        blogUpdated,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };

  const openCommentPopup = (item: Comment) => {
    setCommentData(item);
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
              onClick={() => updatePost(blogPost)}
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
          {data?.map((item: Comment) => (
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
        <Popup openForm={openFullComent} title={commentData?.name}>
          {commentData && (
            <CommentCard
              comment={commentData}
              isFullBody={true}
              onClick={() => setOpenFullComment(false)}
            />
          )}
        </Popup>
      </form>
    </div>
  );
}
