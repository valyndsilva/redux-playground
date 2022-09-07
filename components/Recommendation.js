import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

function Recommendation({ type }) {
  // const name = useSelector(state => state.user.name)
  // When using Custom Redux Reducers:
  const name = useSelector(state => state.user.userInfo.name)
  const title =
    type === "user"
      ? "Recommended for " + name
      : type === "popular"
      ? "Popular on Redux App"
      : "Editor's choice";

  const img =
    type === "user"
      ? "https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      : type === "popular"
      ? "https://images.pexels.com/photos/5191390/pexels-photo-5191390.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      : "https://images.pexels.com/photos/2733659/pexels-photo-2733659.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

  return (
    <div className="mb-5">
      <span className="font-light">{title}</span>
      <div className="relative w-full h-24 cursor-pointer">
        <Image
          className="mt-2 "
          src={img}
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default Recommendation;
