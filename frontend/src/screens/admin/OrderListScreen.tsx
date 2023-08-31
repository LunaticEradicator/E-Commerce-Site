import "../../sass/screens/admin/orderListScreen.scss";
// import React from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../../components/Reuseable/Button";
import { Link } from "react-router-dom";
import Message from "../../components/Reuseable/Message";
import SkeltonLoader from "../../components/Reuseable/SkeltonLoader";
import { useGetAllOrdersAdminQuery } from "../../store/apis/orderApi";

export default function OrderListScreen() {
  const { data: getAllOrders, isLoading, error } = useGetAllOrdersAdminQuery();
  console.log(getAllOrders);
  let renderedOrderList;

  if (isLoading) {
    renderedOrderList = <SkeltonLoader times={2} className="defaultDiv" />;
  } else if (error) {
    renderedOrderList = <Message danger>Error Loading Page</Message>;
  } else {
    renderedOrderList = getAllOrders.map((order) => {
      return (
        <tr key={order._id}>
          <td data-label="ID">{order._id}</td>
          <td data-label="USER">{order.user && order.user.name}</td>
          <td data-label="DATE">{order.createdAt.substring(0, 10)}</td>
          <td data-label="TOTAl">{order.totalPrice}</td>
          <td data-label="PAID">
            {order.isPaid ? (
              order.paidAt.substring(0, 10)
            ) : (
              <FaTimes style={{ color: "red" }} />
            )}
          </td>
          <td data-label="DELIVERED">
            {order.isDelivered ? (
              order.deliveredAt.substring(0, 10)
            ) : (
              <FaTimes style={{ color: "red" }} />
            )}
          </td>
          <td>
            <Button rounded className="main__myOrders__button">
              <Link to={`/order/${order._id}`}>Details</Link>
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderedOrderList}</tbody>
      </table>
    </div>
  );
}
