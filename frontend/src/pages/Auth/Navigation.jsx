import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";

import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // Toggle user dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Logout
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      id="navigation-container"
      className="xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black h-screen fixed"
      style={{ zIndex: 9999 }}
    >
{/* ================= TOP NAVIGATION ================= */}
<div className="flex flex-col space-y-8">

  {/* HOME */}
  <Link
    to="/"
    className="nav-link flex items-center transition-transform transform hover:translate-x-2"
  >
    <AiOutlineHome className="nav-icon" size={26} />

    <span className="nav-item-name">
      HOME
    </span>
  </Link>

  {/* SHOP */}
  <Link
    to="/shop"
    className="nav-link flex items-center transition-transform transform hover:translate-x-2"
  >
    <AiOutlineShopping className="nav-icon" size={26} />

    <span className="nav-item-name">
      SHOP
    </span>
  </Link>

  {/* CART */}
  <Link
    to="/cart"
    className="nav-link flex relative transition-transform transform hover:translate-x-2"
  >
    <AiOutlineShoppingCart
      className="nav-icon"
      size={26}
    />

    <span className="nav-item-name">
      CART
    </span>

    {cartItems.length > 0 && (
      <span className="cart-count">
        {cartItems.reduce((a, c) => a + c.qty, 0)}
      </span>
    )}
  </Link>

  {/* FAVORITES */}
  <Link
    to="/favorite"
    className="nav-link flex relative transition-transform transform hover:translate-x-2"
  >
    <FaHeart
      className="nav-icon"
      size={21}
    />

    <span className="nav-item-name">
      FAVORITES
    </span>

    <FavoritesCount />
  </Link>
</div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="relative">

        {/* ================= LOGGED IN USER ================= */}
        {userInfo ? (
          <>
            {/* USER BUTTON */}
            <button
              onClick={toggleDropdown}
              className="user-button flex items-center text-white focus:outline-none"
            >
              <span className="username">
                {userInfo.username}
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                  dropdownOpen ? "rotate-180" : ""
                } transition-transform`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* USER DROPDOWN */}
            {dropdownOpen && (
              <ul
                className={`user-dropdown absolute right-0 space-y-2 bg-white text-gray-600 ${
                  userInfo.isAdmin
                    ? "bottom-10"
                    : "bottom-10"
                }`}
              >
                {/* ADMIN MENU */}
                {userInfo.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/productlist"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Products
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/categorylist"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Category
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Orders
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/userlist"
                        className="dropdown-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}

                {/* PROFILE */}
                <li>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                </li>

                {/* LOGOUT */}
                <li>
                  <button
                    onClick={logoutHandler}
                    className="dropdown-item w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </>
        ) : (
          /* ================= NOT LOGGED IN ================= */
          <ul>

            {/* LOGIN */}
            <li>
              <Link
                to="/login"
                className="nav-link flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin
                  className="nav-icon"
                  size={26}
                />

                <span className="nav-item-name">
                  LOGIN
                </span>
              </Link>
            </li>

            {/* REGISTER */}
            <li>
              <Link
                to="/register"
                className="nav-link flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd
                  className="nav-icon"
                  size={26}
                />

                <span className="nav-item-name">
                  REGISTER
                </span>
              </Link>
            </li>

          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;