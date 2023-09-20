import { useState } from "react";
import "../sass/screens/shippingScreen.scss";
import FormContainer from "../components/Reuseable/FormContainer";
import Button from "../components/Reuseable/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../store/slices/cartSlice";
import CheckoutSteps from "../components/Reuseable/CheckoutSteps";
import Meta from "../components/Reuseable/Meta";
import { RootState } from "../store/store";

export default function ShippingScreen() {
  const { shippingAddress } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const submitHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      formData.address === "" ||
      formData.city === "" ||
      formData.state === "" ||
      formData.postalCode === "" ||
      formData.country === ""
    ) {
      console.log("required");
    } else {
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
    }
  };

  // console.log(shippingAddress);
  // console.log(formData);

  return (
    <FormContainer>
      <Meta title={"Shipping"} />
      <CheckoutSteps step1 step2 />
      <div className="formContainer__shipping__header">Shipping Address</div>
      <form action="" className="formContainer__shipping">
        <div className="formContainer__shipping__address">
          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            value={formData.address}
            name="address"
            placeholder="Enter Your Address"
            onChange={(event) => formHandler(event)}
            autoComplete="off"
          />
        </div>
        <div className="formContainer__shipping__city">
          <label htmlFor="city">City</label>
          <input
            required
            type="text"
            value={formData.city}
            name="city"
            placeholder="Enter Your City"
            onChange={(event) => formHandler(event)}
            autoComplete="off"
          />
        </div>
        <div className="formContainer__shipping__state">
          <label htmlFor="state">State</label>
          <input
            required
            type="text"
            value={formData.state}
            name="state"
            placeholder="Enter Your State"
            onChange={(event) => formHandler(event)}
            autoComplete="off"
          />
        </div>
        <div className="formContainer__shipping__postalCode">
          <label htmlFor="postalCode">Pincode</label>
          <input
            required
            type="number"
            value={formData.postalCode}
            name="postalCode"
            placeholder="Enter Your Pincode"
            onChange={(event) => formHandler(event)}
            autoComplete="off"
          />
        </div>
        <div className="formContainer__shipping__country">
          <label htmlFor="country">Country</label>
          <input
            required
            type="text"
            value={formData.country}
            name="country"
            placeholder="Enter Your Country"
            onChange={(event) => formHandler(event)}
            autoComplete="off"
          />
        </div>
        <Button
          onClick={(event) => submitHandler(event)}
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
