import Image from "next/image";
import React from "react";

function Recommendation({ type }) {
  const title =
    type === "user"
      ? "Recommended for John"
      : type === "popular"
      ? "Popular on Lama App"
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
