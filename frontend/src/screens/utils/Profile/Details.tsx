import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../../components/Reuseable/Button";

export default function Details({
  _id,
  createdAt,
  totalPrice,
  paidAt,
  isPaid,
  isDelivered,
  deliveredAt,
}) {
  return (
    <tr>
      <td data-label="ID">{_id}</td>
      <td data-label="DATE">{createdAt.substring(0, 10)}</td>
      <td data-label="TOTAL PRICE"> {totalPrice}$</td>
      <td data-label="PAID">
        {isPaid ? (
          paidAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: "red" }} />
        )}
      </td>
      <td data-label="DELIVERY">
        {isDelivered ? (
          deliveredAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: "red" }} />
        )}
      </td>
      <td data-label="">
        <Button rounded className="main__myOrders__button">
          <Link to={`/order/${_id}`}>Details</Link>
        </Button>
      </td>
    </tr>
  );
}
