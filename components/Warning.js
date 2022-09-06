import React from "react";

function Warning() {
  return (
    <div className="p-2 bg-yellow-100 rounded-lg text-sm">
      Deleting account cannot be undone <b>John</b>! You should confirm your
      password to delete your account.
    </div>
  );
}

export default Warning;
