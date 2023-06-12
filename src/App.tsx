import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import Loading from "./components/Loading/Loading";

import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Book from "./pages/Book/Book";
import Register from "./pages/Register/Register";

import { getFetchAccount } from "./services/api";
import { saveLoginData } from "./redux/slices/accountSlice";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


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
    errorElement: <NotFound />,

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

  const dispatch = useDispatch()

  const fetchAccount = async () => {
    let response = await getFetchAccount();

    if (response && response.data && response.data.user) {
      dispatch(saveLoginData(response.data.user))
    }

  }

  useEffect(() => {
    fetchAccount()
  }, [])

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Loading />
    </>
  )
}

export default App
