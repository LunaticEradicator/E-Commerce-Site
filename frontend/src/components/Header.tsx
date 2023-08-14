import { useState } from "react";
import { IoCartOutline, IoPersonSharp, IoMenuSharp } from "react-icons/io5";
import "../sass/components/header.scss";
import logo from "/images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDown from "./Reuseable/DropDown";
import Button from "./Reuseable/Button";

export default function Header() {
  const [isNavExpanded, setIsNavExpanded] = useState(true); ///fixxxxxxx
  const handleHamburger = () => {
    setIsNavExpanded((prevIsNavExpanded) => !prevIsNavExpanded);
    console.log("Clicked");
  };
  // const [selected, setSelected] = useState(null);

  // const handleSelected = (newOption) => {
  //   setSelected(newOption);
  // };

  const dropDownOptionsUser = [
    { label: "Profile", value: "profile" },
    { label: "Logout", value: "logout" },
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

// {
//   userInfo ? (
//     <DropDown options={dropDownOptionsHamburger} name={""} />
//   ) : (
//     <IoMenuSharp />
//   );
// }
