import "../sass/components/header.scss";
import logo from "/images/logo.png";
import { Link } from "react-router-dom";

import { IoCartOutline, IoPersonSharp, IoMenuSharp } from "react-icons/io5";
export default function Header() {
  return (
    <nav>
      <ul className="navbar">
        <li className="navbar__item">
          <Link to="/" className="navbar__item__title">
            <img src={logo} alt="logo" />
            E-Commerce
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/cart" className="navbar__item__link">
            <IoCartOutline />
            Cart
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/login" className="navbar__item__link">
            <IoPersonSharp />
            Sign In
          </Link>
        </li>
        <li className="navbar__item">
          {/* <a className="navbar__item__link" href="#"> */}
          <IoMenuSharp />
          {/* </a> */}
        </li>
      </ul>
    </nav>
  );
}

{
  /* <div className="header">
  <div className="header__title">
    <h2>E-Commerce Site</h2>
  </div>
  <div className="header__content">
    <div className="header__content__cart">
      <IoCartOutline />
      Cart
    </div>
    <div style={{}} className="header__content__sign">
      <IoPersonSharp />
      Sign In
    </div>
  </div>
  <div className="header__hamburger">
    <IoMenuSharp />
  </div>
</div>; */
}
