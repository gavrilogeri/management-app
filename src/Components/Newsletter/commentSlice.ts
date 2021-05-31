import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../store/store";
import { Comment } from "./PostDetails";

const initialStateBlogs = [] as Comment[];

const commentSlice = createSlice({
  name: "comments",
  initialState: initialStateBlogs,
  reducers: {
    getComments(state, action: PayloadAction<Comment[]>) {
      action.payload.forEach((comment) => {
        state.push(comment);
      });
      return state;
    },
  },
});

export default commentSlice.reducer;
export const { getComments } = commentSlice.actions;

export const fetchComments =
  (blogID: number): AppThunk =>
  async (dispatch) => {
    console.log("FETCH COMMENTS CALLED");
    try {
      const fetchedComments = await getCommentData(blogID);
      if (fetchedComments) {
        dispatch(getComments(fetchedComments));
        console.log("FETCH COMMENTS SUCCESS");
      }
    } catch (err) {
      console.log(err);
      // dispatch(getRepoDetailsFailed(err.toString()));
    }
  };

async function getCommentData(blogID: number) {
  const fetchURL = "https://jsonplaceholder.typicode.com/posts";
  try {
    const res = await axios.get<Comment[]>(`${fetchURL}/${blogID}/comments`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error.response);
  }
}
