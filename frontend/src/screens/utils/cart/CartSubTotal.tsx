import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Reuseable/Button";
import type { RootState } from "../../../store/store";

export default function CartSubTotal() {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("clicked");
    // this condition is checked AT LoginScreen
    // if user is logged in and if there is userInfo, redirect to redirect [shipping in this case]
    navigate("/login?redirect=/shipping");
    // navigate("/shipping");
  };

  const subtotalPrice = cartItems.reduce((acc: number, curr: any) => {
    return Number(acc + curr?.price * curr?.qty);
  }, 0);

  const subtotalItem = cartItems.reduce((acc: number, curr: any) => {
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
      {/* <span>Final Cost will be show in checkout page</span> */}
      <hr />
      <Button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
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
