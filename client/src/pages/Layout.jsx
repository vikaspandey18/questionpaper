import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Sipnner from "../components/Sipnner";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { createContext, useContext } from "react";

const UserContext = createContext();

export const loader = async () => {
  try {
    const response = await axios.get("/api/user");
    const { user } = response.data;
    return user;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/login");
  }
};

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const navigate = useNavigate();

  const user = useLoaderData();

  const logoutHandler = async () => {
    navigate("/login");
    const response = await axios.get("/api/auth/logout");
    toast.success(response.data.msg);
  };

  return (
    <UserContext.Provider
      value={{ userid: user._id, name: user.name, logoutHandler }}
    >
      <div>
        {isLoading ? <Sipnner /> : ""}
        <TopBar />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default Layout;
