import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Button from "../../Reuseable/Button";

export default function CartSubTotal() {
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("clicked");
    // this condition is checked AT LoginScreen
    // if user is logged in and if there is userInfo, redirect to redirect [shipping in this case]
    navigate("/login?redirect=/shipping");
  };

  const subtotalPrice = cart.reduce((acc: number, curr: number | string) => {
    return Number(acc + curr?.price * curr?.qty);
  }, 0);

  const subtotalItem = cart.reduce((acc, curr) => {
    return acc + parseInt(curr.qty);
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
