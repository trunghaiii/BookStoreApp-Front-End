import { Outlet } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import Loading from "./components/Loading/Loading";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import UserTable from "./components/Admin/User/UserTable";
import BookTable from "./components/Admin/Book/BookTable";

import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Admin from "./pages/Admin/Admin";
import Book from "./pages/Book/Book";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getFetchAccount } from "./services/api";
import { saveLoginData } from "./redux/slices/accountSlice";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
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
        path: "book/:bookId",
        element: <Book />,
      }
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,

    children: [
      {
        path: "/admin",
        element: <ProtectedRoute><Admin /></ProtectedRoute>,
      },
      {
        path: "user",
        element: <UserTable />,
      },
      {
        path: "book",
        element: <BookTable />,
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
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)

  const fetchAccount = async () => {
    if (window.location.pathname === "/login"
      || window.location.pathname === "/register"
      // || window.location.pathname === "/"
    ) return;
    //console.log("Fetch account");

    let response = await getFetchAccount();

    if (response && response.data && response.data.user) {

      dispatch(saveLoginData(response.data.user))
    }

  }

  useEffect(() => {
    fetchAccount()

  }, [])

  //console.log("return check check");

  return (

    <>
      {isAuthenticated === true
        || window.location.pathname === '/login'
        || window.location.pathname === "/register"
        || window.location.pathname === "/"
        ?
        <RouterProvider router={router} />

        :
        <Loading />
      }

    </>
  )
}

export default App
