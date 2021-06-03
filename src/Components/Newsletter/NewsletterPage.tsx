import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Popup from "../Popup";
import { fetchBlogs } from "./blogSlice";
import OutlinedCard from "./PostCard";
import PostDetails from "./PostDetails";

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
interface Props {
  blogs: BlogPost[];
  onFetchBlogs: () => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    blogs: state.blogs,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onFetchBlogs: () => dispatch(fetchBlogs()),
  };
};
const fetchURL = "https://jsonplaceholder.typicode.com/posts";

function NewsletterPage(props: Props) {
  const [openForm, setOpenForm] = useState(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost>();
  const classes = useStyles();

  useEffect(() => {
    // getData();
    props.onFetchBlogs();
  }, []);

  const openPopup = (item: BlogPost): void => {
    setPopupTitle(`Blog no: ${item.id}`);
    setSelectedBlogPost(item);
    setOpenForm(true);
  };

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        {props.blogs?.map((item: BlogPost) => (
          <Grid item xs={6} key={item.id}>
            <OutlinedCard onClick={() => openPopup(item)} blogPost={item} />
          </Grid>
        ))}
      </Grid>
      <Popup openForm={openForm} title={popupTitle}>
        {selectedBlogPost && (
          <PostDetails
            blogPost={selectedBlogPost}
            setOpenForm={setOpenForm}
            fetchURL={fetchURL}
            setBlogPost={setSelectedBlogPost}
          />
        )}
      </Popup>
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsletterPage);
