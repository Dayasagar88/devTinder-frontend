import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { VIEW_PROFILE } from "../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store?.user);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    if (userData) return;
    try {
      const res = await axios.get(VIEW_PROFILE, { withCredentials: true });
      if (res.data.success) {
        dispatch(addUser(res?.data?.user));
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
