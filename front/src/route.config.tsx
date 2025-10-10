import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { Layout } from "./pages/auth/layout";
import { Profile } from "./pages/auth/profile";
import { Posts } from "./pages/auth/posts";
import { Settings } from "./pages/auth/profile-settings";
import { AddPost } from "./pages/auth/posts/add-post";
import { Search } from "./pages/auth/search";
import { Account } from "./pages/auth/account";
import { PostDetails } from "./pages/auth/posts/post-details";




export const router = createBrowserRouter([
  {
    path:"",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "profile",
    element: <Layout />,
    children: [
      {path:"", element: <Profile />},
      {path:":id", element: <Account />},
      { path: "posts", element: <Posts /> },
      { path: "posts/:id", element: <PostDetails /> },
      { path: "addPost", element: <AddPost /> },
      { path: "settings", element: <Settings /> },   
      { path: "search", element: <Search /> }
    ]
  }
])