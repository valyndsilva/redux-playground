import React from "react";
import MenuLink from "./MenuLink";
import { AiOutlineHome, AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { FiUsers, FiLogOut } from "react-icons/fi";
import { ImFilesEmpty } from "react-icons/im";
import { BiPhotoAlbum, BiTimeFive } from "react-icons/bi";
import { FaPhotoVideo, FaCog } from "react-icons/fa";
import { BsBookmarkHeart } from "react-icons/bs";

function LeftNav() {
  return (
    <nav className="flex-2 md:flex-3 h-[calc(100vh-51px)] border-r-2 border-r-gray-200">
      <div className="p-5">
        <MenuLink icon={<AiOutlineHome />} text="Homepage" />
        <MenuLink icon={<AiOutlineUnorderedList />} text="Lists" />
        <MenuLink icon={<MdOutlineShoppingBasket />} text="Products" />
        <MenuLink icon={<FiUsers />} text="Groups" />
        <MenuLink icon={<ImFilesEmpty />} text="Pages" />
        <MenuLink icon={<BiPhotoAlbum />} text="Photos" />
        <MenuLink icon={<FaPhotoVideo />} text="Videos" />
        <MenuLink icon={<BiTimeFive />} text="Schedule" />
        <MenuLink icon={<BsBookmarkHeart />} text="Wishlist" />
        <MenuLink icon={<FaCog />} text="Settings" />
        <MenuLink icon={<FiLogOut />} text="Logout" />
      </div>
    </nav>
  );
}

export default LeftNav;
