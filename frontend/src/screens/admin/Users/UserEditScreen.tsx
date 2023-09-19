import "../../../sass/screens/admin/userEditScreen.scss";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/Reuseable/Button";
import Message from "../../../components/Reuseable/Message";
import FormContainer from "../../../components/Reuseable/FormContainer";
import { toast } from "react-toastify";
import Loader from "../../../components/Reuseable/Loader";
import {
  useGetUserDetailsAdminQuery,
  useUpdateUserAdminMutation,
} from "../../../store/apis/usersApi";
import Meta from "../../../components/Reuseable/Meta";

export default function UserEditScreen() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetUserDetailsAdminQuery(userId);
  const [updateProduct, { isLoading: updateUserLoading }] =
    useUpdateUserAdminMutation();

  // Auto fill Form
  // Only If Data hasn't loaded
  useEffect(() => {
    if (!isLoading) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          name: user?.name,
          email: user?.email,
          isAdmin: user?.isAdmin,
        };
      });
    }
  }, [user, isLoading]);

  const formDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked, type } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: type === "checkbox" ? checked : value };
    });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateProduct({
        userId: userId,
        name: formData?.name,
        email: formData?.email,
        isAdmin: formData?.isAdmin,
      });
      toast.success("User Updated Successfully");
      navigate("/admin/userList");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  let rendererSingleProduct;
  if (isLoading) {
    rendererSingleProduct = <Loader />;
  } else if (isError) {
    rendererSingleProduct = <Message danger>Error</Message>;
  } else {
    rendererSingleProduct = (
      <FormContainer>
        <form
          action="#"
          onSubmit={(event) => submitHandler(event)}
          className="main__user__edit__formContainer"
          // encType="multipart/form-data"
        >
          <div className="main__user__edit__formContainer__name">
            <label htmlFor="name">Name</label>
            <input
              onChange={(event) => formDataHandler(event)}
              type="text"
              name="name"
              id="name"
              required
              value={formData?.name}
            />
          </div>
          <div className="main__user__edit__formContainer__email">
            <label htmlFor="email">Email</label>
            <input
              onChange={(event) => formDataHandler(event)}
              type="email"
              name="email"
              id="email"
              required
              value={formData?.email}
            />
          </div>
          <div className="main__user__edit__formContainer__isAdmin">
            <label htmlFor="isAdmin">Is Admin</label>
            <input
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              onChange={(event) => formDataHandler(event)}
              checked={formData?.isAdmin}
            />
          </div>
          <Button
            className="main__user__edit__formContainer__updateBtn"
            secondary
            rounded
            loading={updateUserLoading}
            disabled={updateUserLoading}
          >
            Update User
          </Button>
        </form>
      </FormContainer>
    );
  }
  return (
    <div className="main__user__edit">
      <Meta title={user?.name} />

      <Link to="/admin/userList">
        <Button secondary outline rounded>
          Go Back
        </Button>
      </Link>
      <div className="main__user__edit__header">Edit User</div>
      {rendererSingleProduct}
    </div>
  );
}
