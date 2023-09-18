import { useState, useEffect } from "react";
import "../sass/screens/loginScreen.scss";
import FormContainer from "../components/Reuseable/FormContainer";
import Button from "../components/Reuseable/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/apis/usersApi";
import { toast } from "react-toastify";
import { RootState, setCredentials } from "../store/store"; // setter function

export default function LoginScreen() {
  const dispatch = useDispatch(); //  used with setter function
  const navigate = useNavigate();
  const [loginApiCall, { isLoading }] = useLoginMutation(); // fetch fnc
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  // when we login using backend a token is created and stored as a cookie
  // from that cookie we get the token values and save it as userInfo [localStorage]
  // so if we have userInfo [localStorage] we will be signed in automatically and will be redirected to redirect
  // [ex : - redirect to shipping from cart if userInfo is there]

  const { userInfo } = useSelector((state: RootState) => state.auth);

  //checking if url have 'redirect' in it's address
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  // if we does not check for this, redirect will not happen even if we are logged in
  // one of it's condition is checked AT CartSubTotal component
  useEffect(() => {
    // if the userInfo state has value [logged in]
    // navigate url to pages, which have a "redirect" condition [like shipping]
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  // console.log(redirect);

  const formControllerHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  // Submit for login
  const submitHandler = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      // we are send back a mutation from ${BASE_URL} / auth`
      // to check if the user entered email and password is there in the database
      // if available we will parse it in the body
      // and get that user's info back
      const res = await loginApiCall({
        email: formData.userEmail,
        password: formData.userPassword,
      }).unwrap();
      // saving the user info in localStorage so that user won't logoff when the page is refreshed
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
      // toast.error(error?.data?.message || error.error);
    }
    console.log("Submitted");
  };

  return (
    <FormContainer>
      <div className="formContainer__headerLogin">Login User</div>
      <form action="#" className="formContainer__login">
        <div className="formContainer__userEmailLogin">
          <label htmlFor="userEmail">Email Address</label>
          <input
            value={formData.userEmail}
            type="email"
            name="userEmail"
            required
            placeholder="Enter email"
            onChange={formControllerHandler}
          />
        </div>
        <div className="formContainer__userPasswordLogin">
          <label htmlFor="userPassword">Password</label>
          <input
            value={formData.userPassword}
            type="password"
            name="userPassword"
            required
            placeholder="Enter password"
            onChange={formControllerHandler}
          />
        </div>
        <Button
          onClick={(event) => submitHandler(event)}
          className="formContainer__loginBtn"
          secondary
          rounded
          disabled={isLoading}
          loading={isLoading}
        >
          Login In
        </Button>
        {/* {isLoading && <div>Getting User</div>} */}
        <div className="formContainer__registerLink">
          New Customer?{" "}
          {/* if user tries to checkout without logging in or register 
           redirect from shipping to login or register 
          else go to  /register  or /login*/}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </form>
    </FormContainer>
  );
}
