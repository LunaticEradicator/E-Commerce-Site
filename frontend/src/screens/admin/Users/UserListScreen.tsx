// import React from "react";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Button from "../../../components/Reuseable/Button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Message from "../../../components/Reuseable/Message";
import Loader from "../../../components/Reuseable/Loader";
import {
  useGetUsersAdminQuery,
  useDeleteUserByAdminMutation,
} from "../../../store/apis/usersApi";
import Meta from "../../../components/Reuseable/Meta";

export default function UserListScreen() {
  const { data: users, isLoading, isError, refetch } = useGetUsersAdminQuery();
  const [deleteUserByAdmin, { isLoading: deleteUserLoading }] =
    useDeleteUserByAdminMutation();
  console.log(users);
  let renderedOrderList;

  const deleteBtnHandler = async (id: string) => {
    try {
      if (window.confirm("Delete selected User?")) {
        await deleteUserByAdmin(id);
        toast.success("Deleted User");
        refetch();
      }
    } catch (error) {
      toast.error("Cannot Delete User");
    }
  };

  if (isLoading) {
    renderedOrderList = <Loader />;
  } else if (isError) {
    renderedOrderList = <Message danger>Error Loading Page</Message>;
  } else {
    renderedOrderList = users.map((user) => {
      return (
        <tr key={user._id}>
          <td data-label="ID">{user._id}</td>
          <td data-label="NAME">{user.name}</td>
          <td data-label="Email">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </td>
          <td data-label="ADMIN">
            {user.isAdmin ? (
              <FaCheck style={{ color: "green" }} />
            ) : (
              <FaTimes style={{ color: "red" }} />
            )}
          </td>
          <td>
            <Button rounded className="main__myOrders__button">
              <Link to={`/admin/userlist/${user._id}/edit`}>
                <FaEdit style={{ color: "black", width: "15px" }} />
              </Link>
            </Button>
          </td>
          <td>
            <Button
              onClick={() => deleteBtnHandler(user._id)}
              rounded
              disabled={deleteUserLoading}
              loading={deleteUserLoading}
              className="productList__deleteButton"
            >
              <FaTrash style={{ color: "white", width: "15px" }} />
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <Meta title={"Users"} />
      <table>
        <caption>Users</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderedOrderList}</tbody>
      </table>
    </>
  );
}
