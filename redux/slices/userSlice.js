// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     name: "Valyn",
//     email: "valyn@gmail.com",
//   },
//   reducers: {
//     // Define actions here:
//     update: (state, action) => {
//       // action.paylod = {"john", "john@gmail.com"}
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//     },
//     remove: (state) => (state = {}),
//     addHelloToName: (state, action) => {
//       state.name = "Hello " + action.payload.name;
//     },
//   },
// });

// // Export actions and reducers:
// export const { update, remove, addHelloToName } = userSlice.actions;

// export default userSlice.reducer;

/////////////////////////////////////////////////////////////////////////

// 1st Method: Using Custom Reducers to handle Async functions like api calls in Redux:

// import { createSlice } from "@reduxjs/toolkit";
// // import axios from "axios";

// export const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userInfo: {
//       name: "Valyn",
//       email: "valyn@gmail.com",
//     },
//     pending: null,
//     error: false,
//   },
//   reducers: {
//     updatePending: (state) => {
//       state.pending = true;
//     },
//     updateFulfilled: (state, action) => {
//       state.pending = false;
//       state.userInfo = action.payload;
//     },
//     updateRejected: (state) => {
//       state.error = true;
//       state.pending = false;
//     },
//   },
// });
// // You can define your api calls here or create a diffrent api call file in redux folder apiCalls.js.
// // export const updateUser = async (user, dispatch) => {
// //   dispatch(updateStart());
// //   try {
// //     // const res= await axios.post("http:localhost:8800/api/users/:id/update");
// //     const res = await axios.post(
// //       "http://localhost:8800/api/users/123/update",
// //       user
// //     );
// //     dispatch(updateSuccess(res.data));
// //   } catch (err) {
// //     dispatch(updateError());
// //   }
// // };

// // Export actions and reducers:
// export const { updatePending, updateFulfilled, updateRejected } =
//   userSlice.actions;

// export default userSlice.reducer;

////////////////////////////////////////////////////////////////////////

// 2nd Method: Using Async Redux with Thunk to handle async functions like api calls in Redux:
// Here we don't need to write a custom api call like in redux/apiCalls.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk("users/update", async (user) => {
  const res = await axios.post(
    "http://localhost:8800/api/users/123/update",
    user
  );
  return res.data;
  // We don't need to use try catch block here
  // createAsyncThunk function does the error handling for us.
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "Valyn",
      email: "valyn@gmail.com",
    },
    pending: null,
    error: false,
  },
  reducers: {},
  // When you use async redux i.e createAsyncThunk you can use the functions inside the extraReducers:
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    [updateUser.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },
  },
});

// Export actions and reducers:
export const { updatePending, updateFulfilled, updateRejected } =
  userSlice.actions;

export default userSlice.reducer;
