import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../store/store";
import { BlogPost } from "./NewsletterPage";

const initialStateBlogs = [] as BlogPost[];
const fetchURL = "https://jsonplaceholder.typicode.com/posts";
const blogSlice = createSlice({
  name: "blogs",
  initialState: initialStateBlogs,
  reducers: {
    getBlogs: (state, action: PayloadAction<BlogPost[]>) => {
      action.payload.forEach((blogPost) => {
        state.push(blogPost);
      });
      return state;
    },
    removeBlog: (state, action: PayloadAction<{ postId: number }>) => {
      let blogForRemove = state.find(
        (blog) => blog.id === action.payload.postId
      );

      if (blogForRemove) {
        state.splice(state.indexOf(blogForRemove), 1);
      }
    },
    editBlog: (state, action: PayloadAction<BlogPost>) => {
      let blogForEdit = state.find((blog) => blog.id === action.payload.id);

      if (blogForEdit) {
        state[state.indexOf(blogForEdit)] = action.payload;
      }
    },
  },
});

export default blogSlice.reducer;
export const { getBlogs, removeBlog, editBlog } = blogSlice.actions;

export const fetchBlogs = (): AppThunk => async (dispatch) => {
  console.log("FETCH BLOGS CALLED");
  try {
    const fetchedBlogPosts = await getBlogData();
    if (fetchedBlogPosts) {
      dispatch(getBlogs(fetchedBlogPosts));
    }
  } catch (err) {
    console.log(err);
    // dispatch(getRepoDetailsFailed(err.toString()));
  }
};

export const deleteBlog =
  (postId: number): AppThunk =>
  async (dispatch) => {
    console.log("DELETE BLOG CALLED");
    try {
      const res = await axios.delete(`${fetchURL}/${postId}`, {
        method: "DELETE",
      });
      console.log("succesfully deleted", res);
      dispatch(removeBlog({ postId }));
    } catch (error) {
      console.log(error.response);
    }
  };
export const updateBlog =
  (blogUpdated: BlogPost): AppThunk =>
  async (dispatch) => {
    console.log("UPDATE BLOG CALLED");
    try {
      const res = await axios.put<BlogPost>(
        `${fetchURL}/${blogUpdated.id}`,
        blogUpdated,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      console.log("succesfully updated", res);
      dispatch(editBlog(blogUpdated));
    } catch (error) {
      console.log(error.response);
    }
  };

async function getBlogData() {
  try {
    const res = await axios.get<BlogPost[]>(fetchURL);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error.response);
  }
}
