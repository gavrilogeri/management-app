import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import Popup from "../Popup";
import { fetchBlogs } from "./blogSlice";
import OutlinedCard from "./PostCard";
import PostDetails from "./PostDetails";
// import "/src/styles/appStyles.scss";
// import "./blogStyles.css";

export interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}
interface Props {
  blogs: BlogPost[];
  isLoading: boolean;
  onFetchBlogs: () => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    blogs: state.blogs.blogs,
    isLoading: state.blogs.isLoading,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onFetchBlogs: () => dispatch(fetchBlogs()),
  };
};
const fetchURL = "https://jsonplaceholder.typicode.com/posts";

function NewsletterPage({ onFetchBlogs, ...props }: Props) {
  const [openForm, setOpenForm] = useState(false);
  const [popupTitle, setPopupTitle] = useState<string>("");
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost>();

  useEffect(() => {
    // getData();
    onFetchBlogs();
  }, []);

  const openPopup = (item: BlogPost): void => {
    setPopupTitle(`Blog no: ${item.id}`);
    setSelectedBlogPost(item);
    setOpenForm(true);
  };

  return (
    <div className="newsletterContainer">
      <h1 className="heading">NEWSLETTER</h1>
      <p>
        Feel free to comment and share your feedback, we would like to know your
        toughts on following topics!
      </p>

      {props.isLoading ? (
        <div className="loadingContainer">
          <div className="loading"></div>
        </div>
      ) : (
        <Grid container spacing={4} className="blogGrid">
          {props.blogs?.map((item: BlogPost) => (
            <Grid item xs={4} key={item.id}>
              <OutlinedCard onClick={() => openPopup(item)} blogPost={item} />
            </Grid>
          ))}
        </Grid>
      )}
      <Popup
        openForm={openForm}
        title={popupTitle}
        onClick={() => setOpenForm(false)}
      >
        {selectedBlogPost && (
          <PostDetails
            blogPost={selectedBlogPost}
            setOpenForm={setOpenForm}
            fetchURL={fetchURL}
            setBlogPost={setSelectedBlogPost}
          />
        )}
      </Popup>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(NewsletterPage);
