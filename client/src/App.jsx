import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import About from "./pages/About";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import AuthCheckRoutes from "./components/AuthCheckRoutes";
import CreateList from "./pages/HouseList/CreateList";
import UserLists from "./pages/UserLists";
import AdminOrders from "./pages/AdminOrders";
import PaymentListOption from "./pages/PaymentListOption";
import PaymentSystem from "./pages/PaymentSystem";
import UpdateList from "./pages/HouseList/UpdateList";
import DetailsOfList from "./pages/HouseList/DetailsList";
import Listings from "./pages/HouseList/Listings";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NewPassword from "./pages/Auth/NewPasswordSet";
import GuestRoute from "./components/GuestRoute";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <>
      {!isHomePage && <Header />}
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
        <Route path="/admin/order" element={<AdminOrders />} />
        <Route path="/details/:id" element={<DetailsOfList />} />
        <Route path="/listings/search" element={<Listings />} />

        <Route element={<AuthCheckRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createList" element={<CreateList />} />
          <Route path="/userLists/:uid" element={<UserLists />} />
          <Route path="/updateList/:id" element={<UpdateList />} />
          <Route path="/paymentOption" element={<PaymentListOption />} />
          <Route path="/payment/:orderId" element={<PaymentSystem />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
