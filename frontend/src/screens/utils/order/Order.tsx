// import React from "react";
import Button from "../../../components/Reuseable/Button";
import Message from "../../../components/Reuseable/Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SkeltonLoader from "../../../components/Reuseable/SkeltonLoader";
import { useDeliveryOrderMutation } from "../../../store/apis/orderApi";
import { useSelector } from "react-redux/es/hooks/useSelector";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { usePayOrderMutation } from "../../../store/apis/orderApi";

export default function Order({
  refetch,
  order,
  loadingPayOrder,
  isPending,
  payOrder,
  orderId,
  PayPalButtons,
}) {
  let renderPayPal;
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: deliveryLoading }] =
    useDeliveryOrderMutation();

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    console.log(payOrder({ orderId, details: { payer: {} } }));
    refetch();
    toast.success("Payment Successful");
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
  function onError(error) {
    toast.error(error?.data?.message || error.message);
  }

  const deliveryHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Delivered Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  const renderedOrderItems = order?.orderItems.map((item, index) => {
    return (
      <div key={index} className="main__orders__details__order__items">
        <div className="main__orders__details__order__item">
          <div className="main__orders__details__order__item__image">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="main__orders__details__order__item__name">
            <Link to={`/products/${item._id}`}>{item.name}</Link>
          </div>
          <div className="main__orders__details__order__item__qty">
            {`${item.qty} x $${item.price} = $${item.qty * item.price}`}
          </div>
        </div>
        <hr />
      </div>
    );
  });

  if (loadingPayOrder) {
    renderPayPal = <SkeltonLoader times={2} className="defaultDiv" />;
  } else if (isPending) {
    renderPayPal = <SkeltonLoader times={2} className="defaultDiv" />;
  } else {
    renderPayPal = (
      <>
        <div className="main__orders__summary__payment__trial">
          <Button onClick={onApproveTest} secondary rounded>
            Test Pay
          </Button>
        </div>
        <div className="main__orders__summary__payment__paypal">
          {/* <PayPalScriptProvider options={{ clientId: "test" }}> */}
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
          ></PayPalButtons>
          {/* </PayPalScriptProvider> */}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="main__orders__details">
        <div className="main__orders__details__shipping">
          <div className="main__orders__details__shipping__header">
            Shipping
          </div>
          <div className="main__orders__details__shipping__name">
            <span>Name: </span>
            {order.user.name}
          </div>
          <div className="main__orders__details__shipping__email">
            <span>Email: </span>
            {order.user.email}
          </div>
          <div className="main__orders__details__shipping__address">
            <span>Address: </span>
            {order.shippingAddress.address},{order.shippingAddress.city},
            {order.shippingAddress.state},{order.shippingAddress.postalCode},
            {order.shippingAddress.country}
          </div>
          <div className="main__orders__details__shipping__status">
            {order.isDelivered === true && <Message success>Delivered</Message>}
            {order.isDelivered === false && (
              <Message danger>Not Delivered</Message>
            )}
          </div>
        </div>
        <div className="main__orders__details__payment">
          <div className="main__orders__details__payment__header">
            Payment Method
          </div>
          <div className="main__orders__details__payment__type">
            <span> Method:</span>
            {order?.paymentMethod}
          </div>
          <div className="main__orders__details__payment__status">
            {order.isPaid === true && (
              <Message success>Paid on {order.paidAt} </Message>
            )}
            {order.isPaid === false && <Message danger>Not Paid</Message>}
          </div>
          {/* <hr /> */}
        </div>
        <div className="main__orders__details__order">
          <div className="main__orders__details__order__header">
            Order Items
          </div>
          {renderedOrderItems}
        </div>
      </div>

      <div className="main__orders__summary">
        <div className="main__orders__summary__header">
          Order Summary
          <hr />
        </div>

        <div className="main__orders__summary__price">
          <div className="main__orders__summary__price__items">
            <span> Items Price :</span>
            <span>${order?.itemsPrice}</span>
          </div>
          <div className="main__orders__summary__price__shipping">
            <span>Shipping Price :</span>
            <span>${order?.shippingPrice}</span>
          </div>
          <div className="main__orders__summary__price__tax">
            <span> Tax Price :</span>
            <span>${order?.taxPrice}</span>
          </div>
          <div className="main__orders__summary__price__total">
            <span>Total Price :</span>
            <span>${order?.totalPrice}</span>
          </div>
        </div>
        <div className="main__orders__summary__payment">
          {!order?.isPaid && renderPayPal}
        </div>
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div className="main__orders__summary__deliveryButton">
            <Button secondary rounded onClick={deliveryHandler}>
              Mark as Deliver
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
