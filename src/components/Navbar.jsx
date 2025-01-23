import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_URL } from "../constants/routes";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.post(LOGOUT_URL, {}, { withCredentials: true });
      if(res.data.success){
        dispatch(removeUser());
        navigate("/login")
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const user = useSelector((store) => store?.user);
  return (
    <div
      className="navbar  top-0 text-gray-200 z-20"
      style={{
        background: "linear-gradient(to right, #3B3A73, #1F78A4)", // Slightly darker tones
      }}
    >
      <div className="flex-1">
        <Link to={user ? "/app" : "/"} className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/app/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
