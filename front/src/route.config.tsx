import { createBrowserRouter } from "react-router-dom";
import { Signup } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { Layout } from "./pages/auth/layout";
import { Profile } from "./pages/auth/profile";
import { Posts } from "./pages/auth/posts";
import { Settings } from "./pages/auth/profile-settings/settings";



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
      { path: "posts", element: <Posts /> },
      { path: "settings", element: <Settings /> }   
    ]
  }
])