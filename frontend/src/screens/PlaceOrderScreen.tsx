import "../sass/screens/placeOrderScreen.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Reuseable/Button";
import { useCreateOrderMutation } from "../store/apis/orderApi";
import { toast } from "react-toastify";
import { clearCartItems } from "../store/slices/cartSlice";
import Meta from "../components/Reuseable/Meta";
import { RootState } from "../store/store";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder] = useCreateOrderMutation();
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state: RootState) => {
    return state.cart;
  });

  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const renderedOrderItems = cartItems.map((item: any, index: number) => {
    return (
      <div key={index} className="main__placeOrders__details__order__items">
        <Meta title={"Place Order"} />
        <div className="main__placeOrders__details__order__item">
          <div className="main__placeOrders__details__order__item__image">
            <img
              src={
                item?.img.includes("images")
                  ? item?.img
                  : `/uploads/${item?.img}`
              }
              alt={item.name}
            />
          </div>
          <div className="main__placeOrders__details__order__item__name">
            <Link to={`/products/${item._id}`}>{item.name}</Link>
          </div>
          <div className="main__placeOrders__details__order__item__qty">
            {`${item.qty} x $${item.price} = $${item.qty * item.price}`}
          </div>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="main__placeOrders">
      <div className="main__placeOrders__details">
        <div className="main__placeOrders__details__shipping">
          <div className="main__placeOrders__details__shipping__header">
            Shipping
          </div>
          <div className="main__placeOrders__details__shipping__address">
            <span>Address:</span>
            <br />
            {shippingAddress.address},
            <br /> {shippingAddress.city},
            <br /> {shippingAddress.state},
            <br /> {shippingAddress.postalCode},
            <br /> {shippingAddress.country}
          </div>
          <div className="main__placeOrders__details__shipping__content"></div>
          {/* <hr /> */}
        </div>
        <div className="main__placeOrders__details__payment">
          <div className="main__placeOrders__details__payment__header">
            Payment Method
          </div>
          <div className="main__placeOrders__details__payment__type">
            <span> Method:</span>
            {paymentMethod}
          </div>
          {/* <hr /> */}
        </div>
        <div className="main__placeOrders__details__order">
          <div className="main__placeOrders__details__order__header">
            Order Items
          </div>
          {renderedOrderItems}
        </div>
      </div>

      <div className="main__placeOrders__summary">
        <div className="main__placeOrders__summary__header">Order Summary</div>

        <div className="main__placeOrders__summary__price">
          <div className="main__placeOrders__summary__price__items">
            <span> Items Price :</span>
            <span>${itemsPrice}</span>
          </div>
          <div className="main__placeOrders__summary__price__shipping">
            <span>Shipping Price :</span>
            <span>${shippingPrice}</span>
          </div>
          <div className="main__placeOrders__summary__price__tax">
            <span> Tax Price :</span>
            <span>${taxPrice}</span>
          </div>
          <div className="main__placeOrders__summary__price__total">
            <span>Total Price :</span>
            <span>${totalPrice}</span>
          </div>
        </div>
        <hr />

        <div className="main__placeOrders__summary__message">
          {/* <Message></Message> */}
        </div>

        <div className="main__placeOrders__summary__placeOrder">
          <Button onClick={placeOrderHandler} secondary rounded>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
