import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../store/store";
import { BlogPost } from "./NewsletterPage";
interface BlogsState {
  blogs: BlogPost[];
  isLoading: boolean;
}
// const initialStateBlogs = [] as BlogPost[];
const initialStateBlogs: BlogsState = {
  blogs: [],
  isLoading: false,
};
function startLoading(state: BlogsState) {
  state.isLoading = true;
}
const fetchURL = "https://jsonplaceholder.typicode.com/posts";

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialStateBlogs,
  reducers: {
    getBlogsStart: startLoading,
    getBlogs: (state, action: PayloadAction<BlogPost[]>) => {
      action.payload.forEach((blogPost) => {
        state.blogs.push(blogPost);
      });
      state.isLoading = false;
      return state;
    },
    removeBlog: (state, action: PayloadAction<{ postId: number }>) => {
      let blogForRemove = state.blogs.find(
        (blog) => blog.id === action.payload.postId
      );

      if (blogForRemove) {
        state.blogs.splice(state.blogs.indexOf(blogForRemove), 1);
      }
    },
    editBlog: (state, action: PayloadAction<BlogPost>) => {
      let blogForEdit = state.blogs.find(
        (blog) => blog.id === action.payload.id
      );

      if (blogForEdit) {
        state.blogs[state.blogs.indexOf(blogForEdit)] = action.payload;
      }
    },
  },
});

export default blogSlice.reducer;
export const { getBlogs, removeBlog, editBlog, getBlogsStart } =
  blogSlice.actions;

export const fetchBlogs = (): AppThunk => async (dispatch, getState) => {
  console.log("FETCH BLOGS CALLED");
  try {
    dispatch(getBlogsStart());
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
      const res = await axios.delete(`${fetchURL}/${postId}`);
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
        blogUpdated
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
