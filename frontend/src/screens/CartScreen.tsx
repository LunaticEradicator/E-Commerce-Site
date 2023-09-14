import "../sass/screens/cartScreen.scss";
import CartItems from "./utils/cart/CartItems";
import CartSubTotal from "./utils/cart/CartSubTotal";
import Meta from "../components/Reuseable/Meta";

export default function CartScreen() {
  return (
    <div className="main__cart">
      <Meta title="Cart" />
      <div className="main__cart__item">
        <div className="main__cart__item__header">Shopping Cart</div>
        <div className="main__cart__item__details">
          <CartItems />
        </div>
      </div>
      <div className="main__cart__subTotal">
        <CartSubTotal />
      </div>
    </div>
  );
}
