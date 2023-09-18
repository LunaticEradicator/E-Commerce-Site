import classNames from "classnames";
import "../../sass/components/button.scss";
import { GoSync } from "react-icons/go";

interface propButton {
  children: string[] | string | JSX.Element | JSX.Element[];
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  rounded?: boolean;
  outline?: boolean;
  onClick?: (event?: any) => void;
}

export default function Button({
  children,
  disabled,
  className,
  primary,
  secondary,
  success,
  danger,
  warning,
  rounded,
  outline,
  loading,
  onClick,
  ...rest
}: propButton) {
  const style = classNames("button", className, {
    // if the corresponding boolean[props] is true, select it's class
    button__loading: loading && !disabled,
    button__primary: primary && !disabled,
    button__secondary: secondary && !disabled,
    button__success: success && !disabled,
    button__danger: danger && !disabled,
    button__warning: warning && !disabled,
    button__rounded: rounded && !disabled,
    button__outline: outline && !disabled,
    button__primaryOutline: primary && outline && !disabled,
    button__secondaryOutline: secondary && outline && !disabled,
    button__successOutline: success && outline && !disabled,
    button__warningOutline: warning && outline && !disabled,
    button__dangerOutline: danger && outline && !disabled,
    button__disabled: disabled,
  });

  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={disabled ? true : false}
      className={style}
    >
      {loading ? <GoSync className="animation-spin" /> : children}
    </button>
  );
}
