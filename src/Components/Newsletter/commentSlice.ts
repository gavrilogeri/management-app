import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../../store/store";
import { Comment } from "./PostDetails";

interface CommentState {
  comments: Comment[];
  isLoading: boolean;
}

const initialStateBlogs: CommentState = {
  comments: [],
  isLoading: false,
};
function startLoading(state: CommentState) {
  state.isLoading = true;
}
const commentSlice = createSlice({
  name: "comments",
  initialState: initialStateBlogs,
  reducers: {
    getCommentsStart: startLoading,
    getComments(state, action: PayloadAction<Comment[]>) {
      state.comments = [];
      action.payload.forEach((comment) => {
        state.comments.push(comment);
      });
      state.isLoading = false;
      return state;
    },
  },
});

export default commentSlice.reducer;
export const { getComments, getCommentsStart } = commentSlice.actions;

export const fetchComments =
  (blogID: number): AppThunk =>
  async (dispatch) => {
    console.log("FETCH COMMENTS CALLED");
    try {
      dispatch(getCommentsStart());
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
