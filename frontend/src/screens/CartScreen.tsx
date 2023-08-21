import "../sass/screens/cartScreen.scss";
import CartItems from "../components/Page/cart/CartItems";
import CartSubTotal from "../components/Page/cart/CartSubTotal";

export default function CartScreen() {
  return (
    <div className="main__cart">
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
