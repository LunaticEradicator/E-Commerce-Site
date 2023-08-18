import { useState } from "react";
import "../sass/components/screen/shippingScreen.scss";
import FormContainer from "../components/Reuseable/FormContainer";
import Button from "../components/Reuseable/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../store/slices/cartSlice";
import CheckoutSteps from "../components/Reuseable/CheckoutSteps";

export default function ShippingScreen() {
  const { shippingAddress } = useSelector((state) => state.cart);
  // const location = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // console.log(location);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // address: "",
    // city: "",
    // state: "",
    // postalCode: "",
    // country: "",
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const formHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      saveShippingAddress({
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      })
    );
    navigate("/payment");
    console.log(event.target.value);
  };

  console.log(shippingAddress);
  // console.log(formData);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <div className="formContainer__shipping__header">Shipping Address</div>
      <form action="" className="formContainer__shipping">
        <div className="formContainer__shipping__address">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            value={formData.address}
            name="address"
            placeholder="Enter Your Address"
            onChange={() => formHandler(event)}
          />
        </div>
        <div className="formContainer__shipping__city">
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={formData.city}
            name="city"
            placeholder="Enter Your City"
            onChange={() => formHandler(event)}
          />
        </div>
        <div className="formContainer__shipping__state">
          <label htmlFor="state">State</label>
          <input
            type="text"
            value={formData.state}
            name="state"
            placeholder="Enter Your State"
            onChange={() => formHandler(event)}
          />
        </div>
        <div className="formContainer__shipping__postalCode">
          <label htmlFor="postalCode">Pincode</label>
          <input
            type="number"
            value={formData.postalCode}
            name="postalCode"
            placeholder="Enter Your Pincode"
            onChange={() => formHandler(event)}
          />
        </div>
        <div className="formContainer__shipping__country">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            value={formData.country}
            name="country"
            placeholder="Enter Your Country"
            onChange={() => formHandler(event)}
          />
        </div>
        <Button
          onClick={() => submitHandler(event)}
          secondary
          rounded
          className="formContainer__shipping__button"
        >
          Continue
        </Button>
      </form>
    </FormContainer>
  );
}
