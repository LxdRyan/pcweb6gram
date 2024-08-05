import "./App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
