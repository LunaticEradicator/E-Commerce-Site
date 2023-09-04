import classNames from "classnames";
import "../../sass/components/message.scss";

interface propMessage {
  warning?: boolean;
  danger?: boolean;
  success?: boolean;
  header?: boolean;
  children: string | JSX.Element | JSX.Element[];
  className: string;
}

export default function Message({
  children,
  warning,
  danger,
  success,
  header,
  className,
  ...rest
}: propMessage) {
  const style = classNames(
    "message__info",
    {
      message__warning: warning,
      message__danger: danger,
      message__success: success,
      message__header: header,
    },
    className
  );

  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
