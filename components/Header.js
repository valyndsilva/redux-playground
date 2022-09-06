import Image from "next/image";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
function Header({ name }) {
  return (
    <div className="w-full h-12 border-b-2 border-b-gray-200">
      <div className="h-full py-0 px-5 flex items-center justify-between">
        <div className="navbarLeft">
          <span className="text-md font-bold text-blue-800 mr-12">Redux</span>
          <span className="ml-5">Home</span>
          <span className="ml-5">About</span>
          <span className="ml-5">Contact</span>
        </div>
        <div className="hidden md:inline-flex">
          <div className="w-72 h-6 border-gray-400 border-1 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="search for something..."
              className="w-[80%] border rounded-lg ml-5 p-1 outline-none"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative w-8 h-8 cursor-pointer">
            <Image
              className="rounded-full "
              src="https://images.pexels.com/photos/3024627/pexels-photo-3024627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <span className="my-0 mx-2 font-medium text-xl cursor-pointer">
            {name}
          </span>
          <IoMdArrowDropdown className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Header;
