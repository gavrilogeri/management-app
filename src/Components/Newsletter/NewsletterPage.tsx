import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import OutlinedCard from "./PostCard";
import PostDetails from "./PostDetails";
import axios from "axios";

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

const fetchURL = "https://jsonplaceholder.typicode.com/posts";
export default function NewsletterPage() {
  const [openForm, setOpenForm] = useState(false);
  const [popupTitle, setPopupTitle] = useState<string>("");

  const [blogPost, setBlogPost] = useState<BlogPost>();
  const [data, setData] = useState<BlogPost[]>([]);

  const classes = useStyles();
  async function getData() {
    try {
      const res = await axios.get<BlogPost[]>(fetchURL);
      const data = res.data;
      setData(data);
      console.log("Data fetched successfully");
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const openPopup = (item: BlogPost): void => {
    setPopupTitle(`Blog no: ${item.id}`);
    setBlogPost(item);
    setOpenForm(true);
  };

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        {data?.map((item: BlogPost) => (
          <Grid item xs={6} key={item.id}>
            <OutlinedCard onClick={() => openPopup(item)} blogPost={item} />
          </Grid>
        ))}
      </Grid>
      <Popup openForm={openForm} title={popupTitle}>
        {blogPost && (
          <PostDetails
            blogPost={blogPost}
            setOpenForm={setOpenForm}
            fetchURL={fetchURL}
            setBlogPost={setBlogPost}
          />
        )}
      </Popup>
    </>
  );
}
