import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, uuidv4, getCompNameByCompID } from "../UserControl";
import { loadUserState } from "../UserControl";

const initialStateUsers: User[] = loadUserState();

const usersSlice = createSlice({
  name: "users",
  initialState: initialStateUsers,
  reducers: {
    addUser: {
      reducer: (state, action: PayloadAction<User>) => {
        state.push(action.payload);
        // return [...state, action.payload];
      },
      prepare: (user: User) => ({
        payload: {
          ...user,
          ID: uuidv4(),
          companyName: getCompNameByCompID(user.companyID),
        },
      }),
    },
    editUser: (state, action: PayloadAction<User>) => {
      let userForEdit = state.find((user) => user.ID === action.payload.ID);

      if (userForEdit) {
        state[state.indexOf(userForEdit)] = action.payload;
      }
    },
    removeUser: (state, action: PayloadAction<{ id: string }>) => {
      let userForRemove = state.find((user) => user.ID === action.payload.id);

      if (userForRemove) {
        state.splice(state.indexOf(userForRemove), 1);
      }
    },
  },
});

export const { addUser, editUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
