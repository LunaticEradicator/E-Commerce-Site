import "../sass/components/cartScreen.scss";
import CartDetails from "../components/Page/cart/CartDetails";
import CartSubTotal from "../components/Page/cart/CartSubTotal";

export default function CartScreen() {
  return (
    <div className="main__cart">
      <div className="main__cart__item">
        <div className="main__cart__item__header">Shopping Cart</div>
        <div className="main__cart__item__details">
          <CartDetails />
        </div>
      </div>
      <div className="main__cart__subTotal">
        <CartSubTotal />
      </div>
    </div>
  );
}
