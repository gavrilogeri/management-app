import { Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import Button from "../formComponents/Button";
import { BlogPost } from "./NewsletterPage";
import CommentCard from "./CommentCard";
import Popup from "../Popup";
import CommentPopup from "./CommentPopup";
import customTheme from "../../CustomTheme";

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
export default function PostDetails(props: any) {
  const { blogTitle, blogBody, setOpenForm, userId, postId, fetchURL } = props;
  const [data, setData] = useState<Comment[]>([]);
  const [openFullComent, setOpenFullComment] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  const [commentPostId, setCommentPostId] = useState<number>();
  const [name, setName] = useState<string>();
  const [body, setBody] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [titleValue, setTitleValue] = useState<string>();
  const [bodyValue, setBodyValue] = useState<string>();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };
  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBodyValue(event.target.value);
  };
  const getData = () =>
    fetch(`${fetchURL}/${postId}/comments`).then((res) => {
      return res.json();
    });

  useEffect(() => {
    getData().then((data: Comment[]) => setData(data));
  }, []);

  const deletePost = (postId: number): void => {
    fetch(`${fetchURL}/${postId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log("succesfully deleted", res);
      })
      .then(() => {
        setOpenForm(false);
        alert("POST SUCCESFULLY DELETED");
      });
  };

  const updatePost = (
    id: number,
    title: string,
    body: string,
    userId: number
  ): void => {
    fetch(`${fetchURL}/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        id: { id },
        title: { title },
        body: { body },
        userId: { userId },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    // .then((res) => {
    //     console.log("succesfully updated", res)
    // }).then(() => { alert("POST SUCCESFULLY UPDATED") })
  };

  const openCommentPopup = (item: Comment) => {
    setId(item.id);
    setCommentPostId(item.postId);
    setName(item.name);
    setBody(item.body);
    setEmail(item.email);
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
              // title="title"
              value={titleValue}
              defaultValue={blogTitle}
              onChange={handleTitleChange}
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
              title="body"
              value={bodyValue}
              defaultValue={blogBody}
              onChange={handleBodyChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              text="UPDATE POST"
              onClick={() =>
                updatePost(
                  postId,
                  titleValue === undefined ? blogTitle : titleValue,
                  bodyValue === undefined ? blogBody : bodyValue,
                  userId
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              text="REMOVE POST"
              color="secondary"
              onClick={() => deletePost(postId)}
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
                postId={item.id}
                name={item.name}
                body={item.body}
                email={item.email}
                isFullBody={false}
              />
            </Grid>
          ))}
        </Grid>
        <CommentPopup
          openFullComent={openFullComent}
          setOpenFullComment={setOpenFullComment}
          title={name}
        >
          <CommentCard
            body={body}
            email={email}
            postId={commentPostId}
            id={id}
            isFullBody={true}
            onClick={() => setOpenFullComment(false)}
          />
        </CommentPopup>
      </form>
    </div>
  );
}
