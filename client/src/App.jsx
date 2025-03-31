import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import About from "./pages/About";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import AuthCheckRoutes from "./components/AuthCheckRoutes";
import CreateList from "./pages/HouseList/CreateList";
import UserLists from "./pages/UserLists";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<AuthCheckRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createList" element={<CreateList />} />
          <Route path="/userLists/:uid" element={<UserLists />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
