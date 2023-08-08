import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Button from "../../Reuseable/Button";

export default function CartSubTotal() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("clicked");
    navigate("/login?redirect=/shipping");
  };

  const subtotalPrice = cartItems.reduce(
    (acc: number, curr: number | string) => {
      return acc + curr?.price * curr?.qty;
    },
    0
  );

  const subtotalItem = cartItems.reduce((acc, curr) => {
    return parseInt(acc + curr.qty);
  }, 0);

  const renderedSubTotal = (
    <>
      <div className="main__cart__subTotal__header">
        Subtotal ({subtotalItem}) items
      </div>
      <div className="main__cart__subTotal__totalPrice">
        Total: ${subtotalPrice.toFixed(2)}
      </div>
      <hr />
      <Button
        onClick={handleCheckout}
        secondary
        rounded
        className="main__cart__subTotal__button"
      >
        Proceed to checkout
      </Button>
    </>
  );
  return <>{renderedSubTotal}</>;
}
