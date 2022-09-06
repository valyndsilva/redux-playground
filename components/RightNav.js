import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import Recommendation from "./Recommendation";
function RightNav() {
  return (
    <nav className="flex-3 border-l-2 border-l-gray-200">
      <div className="p-5">
        <Recommendation type="user" />
        <Recommendation type="popular" />
        <Recommendation type="editor" />
        <button className="w-full border-none p-2 font-xl cursor-pointer flex items-center justify-center bg-gray-200">
          See More
          <IoMdArrowDropdown />
        </button>
      </div>
    </nav>
  );
}

export default RightNav;
