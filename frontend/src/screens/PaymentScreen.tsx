import "../sass/screens/paymentScreen.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/Reuseable/FormContainer";
import CheckoutSteps from "../components/Reuseable/CheckoutSteps";
import Button from "../components/Reuseable/Button";
import { savePaymentMethod } from "../store/slices/cartSlice";
import Meta from "../components/Reuseable/Meta";

export default function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    // console.log(!shippingAddress);
    console.log(Object.keys(shippingAddress).length === 0);
    // checking to see if we have a shipping address before moving to payment screen
    if (Object.keys(shippingAddress).length === 0) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [formData, setFormData] = useState({
    paymentMethod: "PayPal",
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
    console.log(value);
  };

  const submitHandler = (event) => {
    console.log("Payment Submitted");
    event.preventDefault();
    dispatch(savePaymentMethod(formData.paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <Meta title={"Payment"} />
      <CheckoutSteps step1 step2 step3 />
      {/* <FormContainer> */}
      <div className="formContainer__payment">
        <div className="formContainer__payment__header">Payment Method</div>
        <form action="">
          <div className="formContainer__payment__type__paypal">
            <fieldset>
              <legend>Select Method</legend>
              <label htmlFor="paymentMethod">PayPal</label>
              <input
                onChange={() => inputHandler(event)}
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={formData.paymentMethod === "PayPal"}
              />
            </fieldset>
          </div>
          <div>
            <Button onClick={() => submitHandler(event)} rounded secondary>
              Continue
            </Button>
          </div>
        </form>
      </div>
      {/* </FormContainer> */}
    </FormContainer>
  );
}
