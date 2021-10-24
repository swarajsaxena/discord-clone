import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  photo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.photo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectPhoto = (state) => state.user.photo;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectEmail = (state) => state.user.email;

export default userSlice.reducer;
