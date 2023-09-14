import "../sass/components/header.scss";
import { useState } from "react";
import { IoCartOutline, IoPersonSharp, IoMenuSharp } from "react-icons/io5";
import logo from "/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "./Reuseable/DropDown";
import DropDownAdmin from "./Reuseable/DropDownAdmin";
import Button from "./Reuseable/Button";
import { removeCredentials } from "../store/slices/authSlice";
import { useLogoutMutation } from "../store/apis/usersApi";
import { toast } from "react-toastify";
import SearchBox from "./Reuseable/SearchBox";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: any) => state.cart);
  const { userInfo } = useSelector((state: any) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  // for nav we add a new class which will make all li be block only when screen is medium
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const navBarExpandHandler = () => {
    setIsNavExpanded((prevIsNavExpanded) => !prevIsNavExpanded);
  };

  // DropDown value and FNC for User
  const [isDrop, setIsDrop] = useState(false);
  const dropDownOptionsUser = [
    {
      label: "Profile",
      value: "profile",
      handler: () => {
        setIsDrop(false);
        console.log("profile");
        navigate("/profile");
      },
    },
    {
      label: "Logout",
      value: "logout",
      handler: async () => {
        setIsDrop(false);
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

  // DropDown value and FNC for Admin
  const [isDropAdmin, setIsDropAdmin] = useState(false);
  const dropDownOptionsAdmin = [
    {
      label: "Users",
      value: "users",
      handler: () => {
        setIsDropAdmin(false);
        console.log("order");
        navigate("/admin/userlist");
      },
    },
    {
      label: "Orders",
      value: "orders",
      handler: () => {
        setIsDropAdmin(false);
        console.log("order");
        navigate("/admin/orderlist");
      },
    },
    {
      label: "Products",
      value: "products",
      handler: () => {
        setIsDropAdmin(false);
        console.log("order");
        navigate("/admin/productlist");
      },
    },
  ];

  // Display number of Item selected by user in cart
  const cartHeader = cartItems.reduce((acc, curr) => {
    return acc + Number(curr.qty);
  }, 0);

  //? "expanded" is a class that will only be added if the display is a phone [medium media query]
  return (
    <nav>
      <ul className={isNavExpanded ? "navbar" : "navbar expanded"}>
        {/*DropDown li ONE [Logo]*/}
        <li className="navbar__item">
          <Link to="/" className="navbar__item__title">
            <img src={logo} alt="logo" />
            E-Commerce
          </Link>
        </li>
        {/* DropDown li TWO SearchBox */}
        <li
          className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
        >
          <SearchBox />
        </li>
        {/* DropDown li THREE */}
        {userInfo && userInfo.isAdmin && (
          <li
            className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
          >
            <DropDownAdmin
              options={dropDownOptionsAdmin}
              name={userInfo.name}
              isDropAdmin={isDropAdmin}
              setIsDropAdmin={setIsDropAdmin}
            />
          </li>
        )}
        {/* DropDown li FOUR */}
        <li
          className={isNavExpanded ? "navbar__item" : "navbar__item expanded"}
        >
          {/* If userInfo is there [if user is logged in] show display userName */}
          {userInfo ? (
            <DropDown
              options={dropDownOptionsUser}
              name={userInfo.name}
              isDrop={isDrop}
              setIsDrop={setIsDrop}
            />
          ) : (
            <Link to="/login" className="navbar__item__link">
              <IoPersonSharp />
              Login
            </Link>
          )}
        </li>

        {/* DropDown li FIVE*/}
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
        {/* DropDown li Last [hamburger icon ] */}
        <Button className="navbar__item" onClick={navBarExpandHandler}>
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
