import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Book from "./pages/Book/Book";
import Register from "./pages/Register/Register";


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 Not Found</div>,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "book",
        element: <Book />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
