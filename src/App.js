import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Details from "./views/Details";
import Update from "./views/Update";
import Add from "./views/Add";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/details/:id", element: <Details /> },
    { path: "/update/:id", element: <Update /> },
    { path: "/add", element: <Add /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
