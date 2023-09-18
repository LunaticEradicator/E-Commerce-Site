/* eslint-disable @typescript-eslint/ban-ts-comment */
//  @ts-nocheck
import "../sass/screens/orderScreen.scss";
import Order from "./utils/order/Order";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Reuseable/Loader";
import Message from "../components/Reuseable/Message";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import {
  // usePayOrderMutation,
  useGetMyOrderByIdQuery,
  useGetPayPalClientIdQuery,
} from "../store/apis/orderApi";
import Meta from "../components/Reuseable/Meta";

export default function OrderScreen() {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useGetMyOrderByIdQuery(orderId);

  // const [payOrder, { isLoading: loadingPayOrder }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!loadingPaypal && !errorPaypal && paypal?.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal?.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  let renderedOrder;
  if (isLoading) {
    renderedOrder = <Loader />;
  } else if (isError) {
    <Message danger>Error</Message>;
  } else {
    renderedOrder = (
      <Order
        refetch={refetch}
        orderId={orderId}
        order={order}
        isPending={isPending}
        PayPalButtons={PayPalButtons}
        // payOrder={payOrder}
        // loadingPayOrder={loadingPayOrder}
      />
    );
  }
  return (
    <>
      <Meta title={"Order Screen"} />
      <div className="main__orders__header">Order: {order?._id}</div>
      <div className="main__orders">{renderedOrder}</div>{" "}
    </>
  );
}
