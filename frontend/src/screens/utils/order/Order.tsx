// import React from "react";
import Button from "../../../components/Reuseable/Button";
import Message from "../../../components/Reuseable/Message";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Reuseable/Loader";
import { useDeliveryOrderMutation } from "../../../store/apis/orderApi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../../store/store";
import { usePayOrderMutation } from "../../../store/apis/orderApi";
import { PayPalButtons } from "@paypal/react-paypal-js";
// import { usePayOrderMutation } from "../../../store/apis/orderApi";

interface postProp {
  refetch: any;
  order: any;
  isPending: boolean;
  orderId: number;
  // PayPalButtons: unknown;
  // payOrder: unknown;
  // loadingPayOrder: boolean;
}
export default function Order({
  refetch,
  order,
  isPending,
  orderId,
}: // payOrder,
// PayPalButtons,
// loadingPayOrder,
postProp) {
  let renderPayPal;
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [deliverOrder] = useDeliveryOrderMutation();
  const [payOrder, { isLoading: loadingPayOrder }] = usePayOrderMutation();

  function onApprove(data: unknown, actions: any) {
    console.log(data);
    return actions.order.capture().then(async function (details: unknown) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    });
  }
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   console.log(payOrder({ orderId, details: { payer: {} } }));
  //   refetch();
  //   toast.success("Payment Successful");
  // }
  function createOrder(data: unknown, actions: any) {
    console.log(data);
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
      .then((orderId: unknown) => {
        return orderId;
      });
  }
  function onError(error: any) {
    toast.error(error?.data?.message || error.error);
  }

  const deliveryHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Delivered Successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const renderedOrderItems = order?.orderItems.map(
    (item: any, index: number) => {
      return (
        <div key={index} className="main__orders__details__order__items">
          <div className="main__orders__details__order__item">
            <div className="main__orders__details__order__item__image">
              <img
                src={
                  item?.img.includes("images")
                    ? item?.img
                    : `/uploads/${item?.img}`
                }
                alt={item.name}
              />
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
    }
  );

  if (loadingPayOrder) {
    renderPayPal = <Loader />;
  } else if (isPending) {
    renderPayPal = <Loader />;
  } else {
    renderPayPal = (
      <>
        <div className="main__orders__summary__payment__trial">
          {/* <Button onClick={onApproveTest} secondary rounded>
            Test Pay
          </Button> */}
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
