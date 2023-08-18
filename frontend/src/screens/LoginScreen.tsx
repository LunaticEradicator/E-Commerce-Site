import { useState, useEffect } from "react";
import "../sass/components/screen/loginScreen.scss";
import FormContainer from "../components/Reuseable/FormContainer";
import Button from "../components/Reuseable/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../store/apis/usersApi";
import { toast } from "react-toastify";
import { setCredentials } from "../store/store"; // setter function

export default function LoginScreen() {
  const dispatch = useDispatch(); //  used with setter function
  const navigate = useNavigate();
  const [loginApiCall, { isLoading }] = useLoginMutation(); // fetch fnc
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";
  useEffect(() => {
    // if the userInfo state has value redirect to "redirect" [shipping]
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  console.log(redirect);

  const formControllerHandler = (event) => {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
    // console.log(formData);
  };

  // Submit for login
  const submitHandler = async (event) => {
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
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
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
          onClick={submitHandler}
          className="formContainer__loginBtn"
          secondary
          rounded
          disabled={isLoading}
          // loading fix thissssssssssssssss
        >
          Login In
        </Button>
        {/* {isLoading && <div>Getting User</div>} */}
        <div className="formContainer__registerLink">
          New Customer?{" "}
          {/* if user is register redirect to redirect page 
          else to to register */}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </div>
      </form>
    </FormContainer>
  );
}
