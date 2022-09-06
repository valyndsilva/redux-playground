import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "john",
    email: "john@email.com",
  },
  reducers: {
    // Define actions here:
    update: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    remove: (state) => {
      state = null;
    },
    addHelloToName: (state, action) => {
      state.name = "Hello " + action.payload.name;
    },
  },
});

// Export actions and reducers:
export const { update, remove } = userSlice.actions;

export default userSlice.reducer;
