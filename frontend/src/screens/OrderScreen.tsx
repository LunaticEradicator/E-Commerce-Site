// import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../sass/screens/orderScreen.scss";
import { useGetOrderDetailsQuery } from "../store/apis/orderApi";
import SkeltonLoader from "../components/Reuseable/SkeltonLoader";
import Message from "../components/Reuseable/Message";

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const { data: order, isLoading, isError } = useGetOrderDetailsQuery(orderId);
  console.log(order);
  let renderedOrder;

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

  if (isLoading) {
    renderedOrder = <SkeltonLoader times={2} className="defaultDiv" />;
  } else if (isError) {
    <Message danger>Error</Message>;
  } else {
    renderedOrder = (
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
              {order.isDelivered === true && (
                <Message success>Delivered</Message>
              )}
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
              {order.isPaid === true && <Message success>Paid</Message>}
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

          <div className="main__orders__summary__message">
            {/* <Message></Message> */}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="main__orders__header">Order: {order?._id}</div>
      <div className="main__orders">{renderedOrder}</div>
    </>
  );
  //     <div className="main__orders"></div>
}
