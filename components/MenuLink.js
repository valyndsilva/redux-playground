import React from "react";
import { useSelector } from "react-redux";

function MenuLink({ icon, text }) {
  // const name = useSelector((state) => state.user.name);
  // When using Custom Redux Reducers:
  const name = useSelector((state) => state.user.userInfo.name);
  return (
    <div className="p-2 rounded-lg flex items-center font-medium cursor-pointer hover:bg-gray-300">
      {icon}
      <span className="hidden md:inline-flex ml-2 mr-1">{text}</span>
      <span className="hidden md:inline-flex">
        {text === "Logout" && `( ${name} )`}
      </span>
    </div>
  );
}

export default MenuLink;
