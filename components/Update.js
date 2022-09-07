import Image from "next/image";
import React, { useState } from "react";
import Warning from "./Warning";
import { useDispatch, useSelector } from "react-redux";
import { addHelloToName, remove, update } from "../redux/slices/userSlice";
// import { updateUser } from "../redux/apiCalls"; // 1st method: Using custom reducer
import { updateUser } from "../redux/slices/userSlice"; // 2nd method: Using createAsyncThunk redux function

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log(name, email);
  // const user = useSelector((state) => state.user);
  // When using Custom Redux Reducers:
  // const user = useSelector((state) => state.user.userInfo);
  // When using Custom Reducers we can destructure the user
  const { userInfo, pending, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    // dispatch(update({ name, email }));
    // dispatch(addHelloToName({ name, email }));

    // 1st method: Using custom reducers we use updateUser from the apiCalls:
    // updateUser({ name, email }, dispatch);
    // 2nd method : Using createAsyncThunk redux function:
    dispatch(updateUser({ name, email }));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    // dispatch(remove());
  };

  return (
    <div className="flex-[6]">
      <div className="p-5">
        <h3 className="text-2xl mb-5 font-normal">Update Your Account</h3>
        <Warning />
        <button
          className="border-none py-1 px-3 text-sm bg-red-400 text-white font-medium mt-3 rounded-lg cursor-pointer"
          onClick={handleDelete}
        >
          Delete Account
        </button>
        <div className="flex flex-col mt-5 border-t-2 border-t-gray-200 pt-2">
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
                // placeholder={user.name}
                placeholder={userInfo.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Email</label>
              <input
                className="w-[40%] p-2 mt-1 border rounded-md"
                type="text"
                // placeholder={user.email}
                placeholder={userInfo.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Password</label>
              <input
                className="w-[40%] p-2 mt-1 border rounded-md"
                type="password"
              />
            </div>
            <button
              className="mt-2 borer-none py-1 px-3 bg-teal-500 text-white rounded-lg cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-teal-200"
              disabled={pending}
              onClick={handleUpdate}
            >
              Update
            </button>
          </form>
          {error && (
            <span className="text-red-500 text-md mt-5 bg-red-100 p-3 rounded-lg w-52">
              Something went wrong!
            </span>
          )}
          {pending === false && (
            <span className="text-gree-500 text-md mt-5 bg-green-100 p-3 rounded-lg w-60">
              Account has been updated!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Update;
