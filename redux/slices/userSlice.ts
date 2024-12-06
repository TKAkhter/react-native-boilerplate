import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  id: string;
  username: string;
  name: string;
  phoneNumber?: string;
  bio?: string;
}

const initialState: UserState = {
  email: "",
  id: "",
  username: "",
  name: "",
  phoneNumber: "",
  bio: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<UserState>) => {
      console.log("Dispatching save action with payload:", action.payload);
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.bio = action.payload.bio;
    },
    remove: (state) => {
      console.log("Dispatching remove action with state:", state);
      state.email = "";
      state.id = "";
      state.username = "";
      state.name = "";
      state.phoneNumber = "";
      state.bio = "";
    },
  },
});

export const { save, remove } = userSlice.actions;
export default userSlice.reducer;
