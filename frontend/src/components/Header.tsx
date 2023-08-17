import { useState } from "react";
import { IoCartOutline, IoPersonSharp, IoMenuSharp } from "react-icons/io5";
import "../sass/components/header.scss";
import logo from "/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "./Reuseable/DropDown";
import Button from "./Reuseable/Button";
import { removeCredentials } from "../store/slices/authSlice";
import { useLogoutMutation } from "../store/apis/usersApi";
import { toast } from "react-toastify";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // for nav we add a new class which will make all li be block only when screen is medium
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const handleHamburger = () => {
    setIsNavExpanded((prevIsNavExpanded) => !prevIsNavExpanded);
    console.log("Clicked");
  };

  const dropDownOptionsUser = [
    {
      label: "Profile",
      value: "profile",
      handler: () => {
        console.log("profile");
      },
    },
    {
      label: "Logout",
      value: "logout",
      handler: async () => {
        console.log("logout");
        try {
          console.log("logout Inner");
          toast.success("User Logged Out ");
          await logoutApiCall().unwrap();
          navigate("/login");
          dispatch(removeCredentials());
        } catch (error) {
          console.log(error);
        }
      },
    },
  ];
  const { cartItems } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);
  const cartHeader = cartItems.reduce((acc, curr) => {
    return acc + Number(curr.qty);
  }, 0);

  return (
    <nav>
      <ul className={isNavExpanded ? "navbar" : "navbar expanded"}>
        <li className="navbar__item">
          <Link to="/" className="navbar__item__title">
            <img src={logo} alt="logo" />
            E-Commerce
          </Link>
        </li>
        <li
          className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
        >
          <Link to="/cart" className="navbar__item__link">
            <div
              className="navbar__item__link__innerChild"
              style={{ display: "flex" }}
            >
              <IoCartOutline />
              Cart
              {cartHeader > 0 && ( // only display if a item is in cart
                <div className="cart">
                  <span>{cartHeader}</span>
                </div>
              )}
            </div>
          </Link>
        </li>
        <li
          className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
        >
          {userInfo ? (
            <DropDown options={dropDownOptionsUser} name={userInfo.name} />
          ) : (
            <Link to="/login" className="navbar__item__link">
              <IoPersonSharp />
              Sign In
            </Link>
          )}
        </li>
        {/*  hamburger icon */}
        <Button className="navbar__item" onClick={handleHamburger}>
          <IoMenuSharp />
        </Button>
      </ul>
    </nav>
  );
}
// const [selected, setSelected] = useState(null);

// const handleSelected = (newOption) => {
//   setSelected(newOption);
// };
