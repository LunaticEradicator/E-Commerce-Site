import "../sass/screens/profileScreen.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setCredentials } from "../store/store";
import { useUpdateProfileMutation } from "../store/apis/usersApi";
import { useGetMyOrdersQuery } from "../store/apis/orderApi";
import Loader from "../components/Reuseable/Loader";
import Message from "../components/Reuseable/Message";
import Details from "./utils/Profile/Details";
import Button from "../components/Reuseable/Button";
import Meta from "../components/Reuseable/Meta";

export default function ProfileScreen() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();
  const { data: getMyOrders, isLoading, error } = useGetMyOrdersQuery();
  const [formData, setFormData] = useState({
    profileName: "",
    profileEmail: "",
    profilePassword: "",
    profileConfirmPassword: "",
  });
  console.log(getMyOrders);

  // auto-filling name and email in profile
  useEffect(() => {
    if (userInfo) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          profileName: userInfo.name,
          profileEmail: userInfo.email,
        };
      });
    }
  }, [userInfo]);

  let renderedOrders;

  if (isLoading) {
    renderedOrders = <Loader />;
  } else if (error) {
    renderedOrders = <Message>Error Loading Page</Message>;
  } else {
    renderedOrders = (
      <table>
        <caption>My Orders</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL PRICE</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* getMyOrders && */}
          {getMyOrders?.map((order) => {
            return <Details key={order._id} {...order} />;
          })}
        </tbody>
      </table>
    );
  }

  function validatePassword(event: React.KeyboardEvent<HTMLInputElement>) {
    formData.profileConfirmPassword !== formData.profilePassword
      ? (event.target as HTMLInputElement).setCustomValidity(".error-message")
      : (event.target as HTMLInputElement).setCustomValidity("");
  }

  const formControllerHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const submitHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      // we are send back a mutation from ${BASE_URL} / auth`
      // to check if the user entered email and password is there in the database
      // if available we will parse it in the body
      // and get that user's info back
      const resBody = await updateProfile({
        _id: userInfo._id,
        name: formData.profileName,
        email: formData.profileEmail,
        password: formData.profilePassword,
      }).unwrap();
      // we are saving it in localStorage
      dispatch(setCredentials({ ...resBody }));
      toast.success("Profile Updated Successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
    console.log("Submitted");
  };
  return (
    <div className="main__profile">
      <Meta title={`User Profile`} />
      {/* <FormContainer> */}
      <div className="main__profile__formContainer">
        <div className="main__profile__formContainer__header">User Profile</div>
        <form action="#">
          <div className="main__profile__formContainer__name">
            <label htmlFor="profileName">Name</label>
            <input
              onChange={(event) => formControllerHandler(event)}
              type="text"
              name="profileName"
              id="profileName"
              placeholder=""
              value={formData.profileName}
              autoComplete="off"
            />
            <p className="error-message">Enter A User Name</p>
          </div>
          <div className="main__profile__formContainer__email">
            <label htmlFor="profileEmail">Email</label>
            <input
              onChange={(event) => formControllerHandler(event)}
              type="email"
              name="profileEmail"
              placeholder=""
              pattern="^([a-z0-9][._]?)+[a-z0-9]@[a-z0-9]+(\.?[a-z0-9]){2}\.(com?|net|org)+(\.[a-z0-9]{2,4})?"
              value={formData.profileEmail}
              autoComplete="off"
            />
            <p className="error-message">
              Email must be a valid address, e.g me@mydomain.com
            </p>
          </div>
          <div className="main__profile__formContainer__password">
            <label htmlFor="profilePassword">Password</label>
            <input
              onChange={(event) => formControllerHandler(event)}
              type="password"
              name="profilePassword"
              placeholder="Enter Password"
              //   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
              value={formData.profilePassword}
              autoComplete="off"
            />
            <p className="error-message">
              Password must contain atleast
              <br />
              One number, uppercase, lowercase, special character
              <br />
              And must be a 8-16 character
              <br />
              Eg : YourPassword@007
            </p>
          </div>
          <div className="main__profile__formContainer__confirmPassword">
            <label htmlFor="profileConfirmPassword">Confirm Password</label>
            <input
              onChange={(event) => formControllerHandler(event)}
              type="password"
              name="profileConfirmPassword"
              placeholder="Enter Confirm Password"
              //   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$"
              onKeyUp={validatePassword}
              value={formData.profileConfirmPassword}
              autoComplete="off"
            />
            <p className="error-message">Password Does Not Match</p>
          </div>
          <Button
            onClick={(event) => submitHandler(event)}
            className="main__profile__formContainer__updateBtn"
            secondary
            rounded
            loading={loadingUpdateProfile}
            disabled={loadingUpdateProfile}
          >
            Update Profile
          </Button>
        </form>
      </div>
      {/* </FormContainer> */}
      <div className="main__myOrders">
        {/* <div className="main__myOrders__header">My Orders</div> */}
        {renderedOrders}
        {getMyOrders?.length === 0 && <Message>You Have No Orders</Message>}
      </div>
    </div>
  );
}
