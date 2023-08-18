import { Link } from "react-router-dom";
import "../../sass/components/checkoutSteps.scss";
import iconEnable from "/images/checkout.png";
import iconDisable from "/images/checkout disable.png";

export default function CheckoutSteps({ step1, step2, step3, step4 }) {
  // ! fix else part

  function checkoutElement(stepName, classStatus, iconStatus) {
    return (
      <div className={`formContainer__checkoutSteps__${classStatus}`}>
        <Link
          className="formContainer__checkoutSteps__enable__link"
          to="/login"
        >
          {stepName}
          {/* login */}
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
        ? checkoutElement("Login", "enable", iconEnable)
        : checkoutElement("Login", "disable", iconDisable)}
      {step2
        ? checkoutElement("Shipping", "enable", iconEnable)
        : checkoutElement("Shipping", "disable", iconDisable)}
      {step3
        ? checkoutElement("Payment", "enable", iconEnable)
        : checkoutElement("Payment", "disable", iconDisable)}
      {step4
        ? checkoutElement("Checkout", "enable", iconEnable)
        : checkoutElement("Checkout", "disable", iconDisable)}
    </div>
  );
}
