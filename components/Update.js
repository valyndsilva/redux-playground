import Image from "next/image";
import React from "react";
import Warning from "./Warning";

function Update() {
  return (
    <div className="flex-[6]">
      <div className="p-5">
        <h3 className="text-2xl mb-5 font-normal">Update Your Account</h3>
        <Warning />
        <button className="border-none py-1 px-3 text-sm bg-red-400 text-white font-medium mt-3 rounded-lg cursor-pointer">
          Delete Account
        </button>
        <div className="flex mt-5 border-t-2 border-t-gray-200 pt-2">
          <form className="flex-1">
            <div className="flex flex-col mb-3">
              <label>Profile Picture</label>
              <div className="mt-2 flex items-center">
                <div className="relative h-8 w-8">
                  <Image
                    className="rounded-full"
                    src="https://images.pexels.com/photos/3024627/pexels-photo-3024627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="ml-2 font-medium text-md text-teal-600">
                  Change
                </span>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <label>Username</label>
              <input
                className="w-[40%] p-2 mt-1 border rounded-md"
                type="text"
                placeholder="John"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Email</label>
              <input
                className="w-[40%] p-2 mt-1 border rounded-md"
                type="text"
                placeholder="john@gmail.com"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Password</label>
              <input
                className="w-[40%] p-2 mt-1 border rounded-md"
                type="password"
              />
            </div>
            <button className="mt-2 borer-none py-1 px-3 bg-teal-500 text-white rounded-lg cursor-pointer font-medium :disabled:cursor-notallowed :disabled:bg-teal-200">
              Update
            </button>
          </form>
          {/* <span className="text-green-500 text-md ml-5">Successful</span> */}
        </div>
      </div>
    </div>
  );
}

export default Update;
