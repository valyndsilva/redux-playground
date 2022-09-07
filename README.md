# Redux VS Context API:

Context API is not really a state management tool. With context API it depends on the whole state.

With a state management tool you can choose any specific item inside your store state and re-render your component depending on only that element.

## Full setup of NextJS with Next-Themes, Redux and Tailwind CSS:

```
 npx create-next-app -e with-tailwindcss redux-playground
 cd redux-playground

npm install @reduxjs/toolkit react-redux

npm install next-themes react-icons

```

In "pages" folder create a 404.js and \_document.js file:
In pages/404.js:

```
const NotFound = () => {
  return (
    <div className="text-center text-gray-600 font-semibold mt-20 text-2xl">
      Oops! page not found 😢
    </div>
  );
};

export default NotFound;
```

In pages/\_document.js:

```
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

```

Create in the root a "components" folder and in it index.js and Layout.js:
In components/Layout.js:

```
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>title goes here</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="title goes here" />
      </Head>
      <div className="min-h-screen flex flex-col  ">
        <main className="flex-grow ">{children}</main>
      </div>
    </>
  );
};

export default Layout;

```

In components/index.js:

```
export { default as Layout } from "./Layout";

```

Create a folder "redux" in the root and in it store.js. Also create in the "redux" folder another folder "slices" and in it userSlice.js:

```
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "john",
    email: "john@email.com",
  },
  reducers: {
    // Define actions here:
    update: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    remove: (state) => (state = {}),
    addHelloToName: (state, action) => {
      state.name = "Hello " + action.payload.name;
    },
  },
});

// Export actions and reducers:
export const { update, remove, addHelloToName } = userSlice.actions;

export default userSlice.reducer;

```

In redux/store.js:

```
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
export default configureStore({
  reducer: {
    user: userReducer,
  },
});

```

Finally, import ThemeProvider, Layout, Provider and store in pages/\_app.js and add a fix for hydration issues:

```
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";
import store from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {

  // To fix hydration UI mismatch issues, we need to wait until the Component has mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
```

Now run the app to test if the setup is successful:

```
npm run dev
```

Lets create the components:

In components/Header.js:

```
import Image from "next/image";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
function Header() {
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
            John
          </span>
          <IoMdArrowDropdown className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Header;

```

In components/Footer.js:

```
import React from "react";

function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t">
      <p>Copyright © 2022 Redux Playground. All Rights Reserved</p>
    </footer>
  );
}

export default Footer;

```

In components/MenuLink.js:

```
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

```

In components/LeftNav.js:

```
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

```

In components/Warning.js:

```
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

```

In components/Update.js:

```
import Image from "next/image";
import React, { useState } from "react";
import Warning from "./Warning";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex-[6]">
      <div className="p-5">
        <h3 className="text-2xl mb-5 font-normal">Update Your Account</h3>
        <Warning />
        <button className="border-none py-1 px-3 text-sm bg-red-400 text-white font-medium mt-3 rounded-lg cursor-pointer">
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
              <input className="w-[40%] p-2 mt-1 border rounded-md" type="password" />
            </div>
            <button  className="mt-2 borer-none py-1 px-3 bg-teal-500 text-white rounded-lg cursor-pointer font-medium disabled:cursor-not-allowed disabled:bg-teal-200">
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

```

In components/Recommendation.js:

```
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

```

In components/RightNav.js:

```
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

```

Next, use these components in the pages/index.js:

```
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Footer, Header, LeftNav, RightNav, Update } from "../components";

const Home = () => {

  return (
    <div className="flex flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex w-full">
        <LeftNav />
        <Update />
        <RightNav />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

```

Let's look at how to use the state and action stored in the redux store:

We use react hooks useSelector() and useDispatch().
useSelector() takes in a function argument that returns the part of the state that you want.
useDispatch() returns a reference to the dispatch function from the Redux store. It is used it to dispatch actions as needed.
Ex: In Header.js component:

```
...
import { useSelector } from "react-redux";
function Header() {
  const name = useSelector(state => state.user.name)
  ....
   return (
    ..
    <span className="my-0 mx-2 font-medium text-xl cursor-pointer">
            {name}
    </span>
          ..


```

Ex: In Recommendation.js component:

```
import { useSelector } from "react-redux";

function Recommendation({ type }) {
  const name = useSelector(state => state.user.name)
  const title =
    type === "user"
      ? "Recommended for " + name
      : type === "popular"
      ? "Popular on Redux App"
      : "Editor's choice";

```

Ex: In MenuLink.js component:

```
import React from "react";
import { useSelector } from "react-redux";

function MenuLink({ icon, text }) {
  const name = useSelector((state) => state.user.name);
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
```

Ex: In Warning.js component:

```
import React from "react";
import { useSelector } from "react-redux";

function Warning() {
    const name = useSelector(state => state.user.name);
  return (
    <div className="p-2 bg-yellow-100 rounded-lg text-sm">
      Deleting account cannot be undone <b>{name}</b>! You should confirm your
      password to delete your account.
    </div>
  );
}

export default Warning;
```

Ex: In the Update.js component we use both hooks useSelector() and useDispatch():

```
import Image from "next/image";
import React, { useState } from "react";
import Warning from "./Warning";
import { useDispatch, useSelector } from "react-redux";
import { addHelloToName, remove, update } from "../redux/slices/userSlice";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log(name, email);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(update({ name, email }));
    //dispatch(addHelloToName({ name, email }));
  };
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(remove());
  };


  return (
    <div className="flex-[6]">
      <div className="p-5">
        <h3 className="text-2xl mb-5 font-normal">Update Your Account</h3>
        <Warning />
        <button className="border-none py-1 px-3 text-sm bg-red-400 text-white font-medium mt-3 rounded-lg cursor-pointer" onClick={handleDelete}>
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
                placeholder={user.name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label>Email</label>
              <input
                className="w-[40%] p-2 mt-1 border rounded-md"
                type="text"
                placeholder={user.email}
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
              onClick={handleUpdate}
            >
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

```

Enter the username and email in the form and click on the Update button to test. It should update the name in all the other components (MenuLink, Warning, Recommendation, Header).
If you click on the Delete button it should set the name to "undefined".

Let's setup a fake mini api in api/index.js:
First we install express and cors

```
npm install express cors
```

Then in api/index.js:

```
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api/users/:id", (req, res) => {
  res.send("Hello from the root application URL");
});

app.post("/api/users/:id/update", (req, res) => {
  setTimeout(() => {
    res.send(req.body);
  }, [2000]);
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});

```

Next in the Terminal:

```
cd pages
cd api
node index.js
```

Backend server should start running.

## Handle Redux Async Functions using Custom Reducers:

Now we see how to handle Async Functions inside Redux:
Remove the reducers from the redux/slices/userSlice.js and update the initialState.

1st Method: Using custom reducers:

In redux/slices/userSlice.js:

```

// 1st Method: Using Custom Reducers to handle Async functions like api calls in Redux:

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "Valyn",
      email: "valyn@gmail.com",
    },
    pending: null,
    error: false,
  },
  reducers: {
    updatePending: (state) => {
      state.pending = true;
    },
    updateFulfilled: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    updateRejected: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});
// You can define your api calls here or create a diffrent api call file in redux folder.

// Export actions and reducers:
export const { updatePending, updateFulfilled, updateRejected } =
  userSlice.actions;

export default userSlice.reducer;

```

Install axios to make the api calls:

```
npm install axios
```

Then we create an apiCalls.js in redux folder:

```
import {
  updatePending,
  updateFulfilled,
  updateRejected,
} from "./slices/userSlice";

export const updateUser = async (user, dispatch) => {
  dispatch(updatePending());
  try {
    // Ex: const res= await axios.post("http:localhost:8800/api/users/:id/update");
    const res = await axios.post(
      "http://localhost:8800/api/users/123/update",
      user
    );
    dispatch(updateFulfilled(res.data));
  } catch (err) {
    dispatch(updateRejected());
  }
};


```

Use the updateUser() in Update.js component and also update the user as per the updated userSlice:

```
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/apiCalls";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  console.log(name, email);
  // const user = useSelector((state) => state.user);

  // When using Custom Redux Reducers:
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    // dispatch(update({ name, email }));
    // dispatch(addHelloToName({ name, email }));

    // Using 1st method of custom reducers we use updateUser from the apiCalls:
    updateUser({ name, email }, dispatch);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    // dispatch(remove());
  };
  ...


```

In Header.js update user:

```
  // const name = useSelector(state => state.user.name)
  // When using Custom Redux Reducers:
  const name = useSelector(state => state.user.userInfo.name)

```

In Recommendation.js update user:

```
  // const name = useSelector(state => state.user.name)
  // When using Custom Redux Reducers:
  const name = useSelector(state => state.user.userInfo.name)

```

In MenuLink.js update user:

```
  // const name = useSelector(state => state.user.name)
  // When using Custom Redux Reducers:
  const name = useSelector(state => state.user.userInfo.name)

```

In Warning.js update user:

```
  // const name = useSelector(state => state.user.name)
  // When using Custom Redux Reducers:
  const name = useSelector(state => state.user.userInfo.name)

```

Open Redux Dev Tools in Console:
Fill up the form and click on update. You should see the actions in the console.

We can use the pending state to disable the "Update" button in Update.js:

```
  // When using Custom Redux Reducers:
  // const user = useSelector((state) => state.user.userInfo);
  // When using Custom Reducers we can destructure the user
    const {userInfo, pending, error} = useSelector((state) => state.user);
    ....

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
            ...
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
           {pending === false  && (
            <span className="text-gree-500 text-md mt-5 bg-green-100 p-3 rounded-lg w-60">
              Account has been updated!
            </span>
          )}
```

Now if you enter the details the button is disbaled for 2 seconds and then updated and you should see the success message.

To test the error message, in redux/apiCalls.js edit the axios link and submit the form you should see the error message:

```
 const res = await axios.post(
      "http://123localhost:8800/api/users/123/update",
      user
    );
```

## Handle Redux Async Functions using createAsyncThunk:

Now we see how to handle Async Functions inside Redux using createAsyncThunk function:
Remove the reducers from the redux/slices/userSlice.js and update the initialState.

2nd Method: Using createAsyncThunk and extraReducers:

In redux/slices/userSlice.js:

```

// 2nd Method: Using Async Redux with Thunk to handle async functions like api calls in Redux:
// Here we don't need to write a custom api call like in redux/apiCalls.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk("users/update", async (user) => {
  const res = await axios.post(
    "http://localhost:8800/api/users/123/update",
    user
  );
  return res.data;
  // We don't need to use try catch block here
  // createAsyncThunk function does the error handling for us.
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "Valyn",
      email: "valyn@gmail.com",
    },
    pending: null,
    error: false,
  },
  reducers: {},
  // When you use async redux i.e createAsyncThunk you can use the functions inside the extraReducers:
  extraReducers: {
    [updateUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    [updateUser.rejected]: (state) => {
      state.pending = null;
      state.error = true;
    },
  },
});

// Export reducer:
export default userSlice.reducer;

```

Now in Update.js component:

```
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
```

Now if you enter the details the button is disbaled for 2 seconds and then updated and you should see the success message and you should see the actions in the Redux Dev console.

To test the error message, in redux/slices/userSlice.js edit the axios link and submit the form you should see the error message:

```
 const res = await axios.post(
      "http://123localhost:8800/api/users/123/update",
      user
    );
```
