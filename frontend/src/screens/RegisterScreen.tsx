/* eslint-disable no-useless-escape */
import "../sass/screens/registerScreen.scss";
import { useState, useEffect } from "react";
import FormContainer from "../components/Reuseable/FormContainer";
import Button from "../components/Reuseable/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../store/apis/usersApi";
import { toast } from "react-toastify";
import { registerCredentials } from "../store/slices/authSlice";
import { RootState } from "../store/store";

export default function RegisterScreen() {
  const { userInfo } = useSelector((state: RootState) => {
    // console.log(state);
    return state.auth;
  }); // to access all states
  const dispatch = useDispatch(); //  used with setter function
  const navigate = useNavigate();
  const [registerApiCall, { isLoading }] = useRegisterMutation(); // fetch fnc

  // Checking if redirect is there in the URl
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    // if the userInfo state has value redirect to shipping
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });

  function validatePassword(event: React.KeyboardEvent<HTMLInputElement>) {
    console.log(formData.userConfirmPassword);
    console.log(formData.userPassword);
    console.log(formData.userConfirmPassword === formData.userPassword);
    formData.userConfirmPassword !== formData.userPassword
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

  // Submit for Register
  const submitHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (
      formData.userName === "" ||
      formData.userEmail === "" ||
      formData.userPassword === "" ||
      formData.userConfirmPassword === "" ||
      formData.userConfirmPassword !== formData.userPassword
    ) {
      // event.target.setCustomValidity(".error-message");
      toast.error("Password must be same");
    } else {
      try {
        // we are send back a mutation from ${BASE_URL} / auth`
        // to check if the user entered email and password is there in the database
        // if available we will parse it in the body
        // and get that user's info back
        const resBody = await registerApiCall({
          name: formData.userName,
          email: formData.userEmail,
          password: formData.userPassword,
        }).unwrap();
        // navigate(redirect);
        dispatch(registerCredentials({ ...resBody }));
        toast.success("Registered Successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    }
    console.log("Submitted");
  };

  return (
    <FormContainer>
      <div className="formContainer__header">Register User</div>
      <form action="#" className="formContainer__register">
        <div className="formContainer__userName">
          <label htmlFor="userName">Name</label>
          <input
            value={formData.userName}
            type="text"
            name="userName"
            required
            placeholder="Enter Name"
            onChange={formControllerHandler}
            autoComplete="off"
          />
          <p className="error-message">Enter A User Name</p>
        </div>
        <div className="formContainer__userEmail">
          <label htmlFor="userEmail">Email Address</label>
          <input
            value={formData.userEmail}
            type="email"
            name="userEmail"
            required
            placeholder="Enter email"
            // pattern="^([a-z\d\.-])+@([a-z\d-])+\.([a-z]{2,8})(\.[a-z]{2,8})?$"
            pattern="^([a-z0-9][._]?)+[a-z0-9]@[a-z0-9]+(\.?[a-z0-9]){2}\.(com?|net|org)+(\.[a-z0-9]{2,4})?"
            onChange={formControllerHandler}
            autoComplete="off"
          />
          <p className="error-message">
            Email must be a valid address, e.g me@mydomain.com
          </p>
        </div>
        <div className="formContainer__userPassword">
          <label htmlFor="userPassword">Password</label>
          <input
            value={formData.userPassword}
            type="password"
            name="userPassword"
            required
            placeholder="Enter password"
            // pattern="^([\w@-_\.]{8,20})$"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$"
            onChange={formControllerHandler}
            autoComplete="off"
          />
          <p className="error-message">
            Password must contain atleast
            <br />
            One number, uppercase, lowercase, special character
            <br />
            And must be a 8-16 character
            <br />
            Eg : Password@12
          </p>
        </div>
        <div className="formContainer__userConfirmPassword">
          <label htmlFor="userConfirmPassword">Confirm Password</label>
          <input
            value={formData.userConfirmPassword}
            type="password"
            name="userConfirmPassword"
            required
            placeholder="Confirm password"
            onKeyUp={(event) => validatePassword(event)}
            onChange={formControllerHandler}
            autoComplete="off"
          />
          <p className="error-message">Password Does Not Match</p>
        </div>
        <Button
          onClick={(event) => submitHandler(event)}
          className="formContainer__registerBtn"
          secondary
          rounded
          disabled={isLoading}
          loading={isLoading}
        >
          Register
        </Button>
        <div className="formContainer__loginLink">
          Already A User?{" "}
          {/* if user is register redirect to redirect page 
          else to to register */}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </div>
      </form>
    </FormContainer>
  );
}
