import classNames from "classnames";
import "../../sass/components/panel.scss";

type propSike = {
  children: JSX.Element | (string | JSX.Element)[];
  className: string;
};

export default function Panels({ children, className, ...rest }: propSike) {
  // const style = classNames("panel", className);
  const style = classNames(className);
  return (
    <div {...rest} className={style}>
      {children}
    </div>
  );
}
