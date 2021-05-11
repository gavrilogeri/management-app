import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import UsersPage from "../Users/UsersPage";
import OutlinedCard from "./PostCard";
import Popup from "../Popup";
import PostDetails from "./PostDetails";
import { isTemplateExpression } from "typescript";

const useStyles = makeStyles((customTheme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: customTheme.spacing(2),
    },
  })
);

export interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// interface Props extends RouteComponentProps<{}> { }
const fetchURL = "https://jsonplaceholder.typicode.com/posts";
export default function NewsletterPage() {
  const [openForm, setOpenForm] = useState(false);
  const [blogId, setBlogId] = useState<string>();
  const [userId, setUserId] = useState<number>();
  const [postId, setPostId] = useState<number>();
  const [data, setData] = useState<BlogPost[]>([]);
  const [blogBody, setBlogBody] = useState<string>();
  const [blogTitle, setBlogTitle] = useState<string>();

  const classes = useStyles();
  const getData = () => fetch(fetchURL).then((res) => res.json());

  useEffect(() => {
    getData().then((data: BlogPost[]) => setData(data));
  }, []);

  const openPopup = (item: BlogPost) => {
    setBlogId(`Blog no: ${item.id}`);
    setBlogTitle(item.title);
    setBlogBody(item.body);
    setOpenForm(true);
    setPostId(item.id);
    setUserId(item.userId);
  };

  const setTitle = (item: BlogPost) => {
    setBlogTitle(item.title);
  };
  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        {data?.map((item: BlogPost) => (
          <Grid item xs={6} key={item.id}>
            <OutlinedCard
              onClick={() => openPopup(item)}
              postId={item.id}
              title={item.title}
              body={item.body}
              userId={item.userId}
            />
          </Grid>
        ))}
      </Grid>
      <Popup openForm={openForm} setOpenForm={setOpenForm} title={blogId}>
        <PostDetails
          blogTitle={blogTitle}
          setOpenForm={setOpenForm}
          blogBody={blogBody}
          userId={userId}
          postId={postId}
          setData={setData}
          fetchURL={fetchURL}
        />
      </Popup>
    </>
  );
}
