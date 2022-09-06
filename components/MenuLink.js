import React from "react";

function MenuLink({ icon, text }) {
  return (
    <div className="p-2 rounded-lg flex items-center font-medium cursor-pointer hover:bg-gray-300">
      {icon}
      <span className="hidden md:inline-flex ml-2 mr-1">{text}</span>
      <span className="hidden md:inline-flex">
        {text === "Logout" && "( John )"}
      </span>
    </div>
  );
}

export default MenuLink;
