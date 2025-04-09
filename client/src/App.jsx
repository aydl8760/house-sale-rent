import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import About from "./pages/About";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import AuthCheckRoutes from "./components/AuthCheckRoutes";
import CreateList from "./pages/HouseList/CreateList";
import UserLists from "./pages/UserLists";
import PaymentListOption from "./pages/PaymentListOption";
import PaymentSystem from "./pages/PaymentSystem";
import UpdateList from "./pages/HouseList/UpdateList";
import DetailsOfList from "./pages/HouseList/DetailsList";
import Listings from "./pages/HouseList/Listings";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NewPassword from "./pages/Auth/NewPasswordSet";
import GuestRoute from "./components/GuestRoute";
import AdminLayout from "./components/AdminView/layout";
import AdminDashBoard from "./pages/AdminView/dashBoard";
import Adminorders from "./pages/AdminView/orders";
import AdminRouteProtected from "./components/AdminRouteProtected";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {!isHomePage && !isAdminPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LogIn />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/forgotPassword"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/reset/:token"
          element={
            <GuestRoute>
              <NewPassword />
            </GuestRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/details/:id" element={<DetailsOfList />} />
        <Route path="/listings/search" element={<Listings />} />

        <Route element={<AdminRouteProtected />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashBoard />} />
            <Route path="order" element={<Adminorders />} />
            <Route />
          </Route>
        </Route>

        <Route element={<AuthCheckRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createList" element={<CreateList />} />
          <Route path="/userLists/:uid" element={<UserLists />} />
          <Route path="/updateList/:id" element={<UpdateList />} />
          <Route path="/paymentOption" element={<PaymentListOption />} />
          <Route path="/payment/:orderId" element={<PaymentSystem />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
