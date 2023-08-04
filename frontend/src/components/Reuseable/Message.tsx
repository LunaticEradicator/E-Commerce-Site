import classNames from "classnames";
import "../../sass/components/message.scss";

interface propMessage {
  warning?: boolean;
  danger?: boolean;
  success?: boolean;
  children: string | JSX.Element | JSX.Element[];
}

export default function Message({
  children,
  warning,
  danger,
  success,
  ...rest
}: propMessage) {
  console.log(success);
  const style = classNames("message__info", {
    message__warning: warning,
    message__danger: danger,
    message__success: success,
  });

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
