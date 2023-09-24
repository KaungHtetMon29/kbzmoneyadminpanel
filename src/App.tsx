import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
import UpdateandCreate from "./pages/updateandcreate";

function App() {
  const status = useSelector((state: any) => state.Auth.signed);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
          loader: async () => {
            return status === false && redirect("/login");
          },
        },
        { path: "/:postid", element: <UpdateandCreate /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
