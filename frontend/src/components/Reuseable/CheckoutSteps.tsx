import { Link } from "react-router-dom";
import "../../sass/components/checkoutSteps.scss";
import iconEnable from "/images/checkout.png";
import iconDisable from "/images/checkout disable.png";

interface propCheckoutSteps {
  step1: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}

export default function CheckoutSteps({
  step1,
  step2,
  step3,
  step4,
}: propCheckoutSteps) {
  function checkoutElement(
    stepName: string,
    classStatus: string,
    iconStatus: string,
    urlName: string
  ) {
    return (
      <div className={`formContainer__checkoutSteps__${classStatus}`}>
        <Link
          className="formContainer__checkoutSteps__enable__link"
          to={`${urlName}`}
        >
          {stepName}
        </Link>
        <img
          className="formContainer__checkoutSteps__enable__icon"
          src={iconStatus}
          alt="tick mark"
        />
      </div>
    );
  }

  return (
    <div className="formContainer__checkoutSteps">
      {step1
        ? checkoutElement("Login", "enable", iconEnable, "/login")
        : checkoutElement("Login", "disable", iconDisable, "#")}
      {step2
        ? checkoutElement("Shipping", "enable", iconEnable, "/shipping")
        : checkoutElement("Shipping", "disable", iconDisable, "#")}
      {step3
        ? checkoutElement("Payment", "enable", iconEnable, "/payment")
        : checkoutElement("Payment", "disable", iconDisable, "#")}
      {step4
        ? checkoutElement("Checkout", "enable", iconEnable, "/checkout")
        : checkoutElement("Checkout", "disable", iconDisable, "#")}
    </div>
  );
}
