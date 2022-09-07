import React from "react";
import { useSelector } from "react-redux";

function Warning() {
  // const name = useSelector(state => state.user.name)
  // When using Custom Redux Reducers:
  const name = useSelector(state => state.user.userInfo.name)
  return (
    <div className="p-2 bg-yellow-100 rounded-lg text-sm">
      Deleting account cannot be undone <b>{name}</b>! You should confirm your
      password to delete your account.
    </div>
  );
}

export default Warning;
