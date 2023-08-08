import "../sass/components/header.scss";
import logo from "/images/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { IoCartOutline, IoPersonSharp, IoMenuSharp } from "react-icons/io5";

export default function Header() {
  const { cartItems } = useSelector((state: any) => {
    return state.cart;
  });
  const cartHeader = cartItems.reduce((acc, curr) => {
    return acc + Number(curr.qty);
  }, 0);
  console.log(cartHeader);
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
          {cartHeader > 0 && (
            <div className="cart">
              <span>{cartHeader}</span>
            </div>
          )}
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
