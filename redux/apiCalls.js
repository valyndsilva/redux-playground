import axios from "axios";
import {
  updatePending,
  updateFulfilled,
  updateRejected,
} from "./slices/userSlice";

export const updateUser = async (user, dispatch) => {
  dispatch(updatePending());
  try {
    // const res= await axios.post("http:localhost:8800/api/users/:id/update");
    const res = await axios.post(
      "http://localhost:8800/api/users/123/update",
      user
    );
    dispatch(updateFulfilled(res.data));
  } catch (err) {
    dispatch(updateRejected());
  }
};
