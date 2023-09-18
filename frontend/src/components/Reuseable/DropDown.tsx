import "../../sass/components/dropDown.scss";
import Panels from "./Panels";
import { useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";

interface postProp {
  options: { label: string; value: string; handler: () => void }[];
  name: string;
  setIsDrop: any;
  // setIsDrop: (value: boolean) => void | any;
  isDrop: boolean;
}
export default function DropDown({
  options,
  name,
  setIsDrop,
  isDrop,
}: postProp) {
  // const [isDrop, setIsDrop] = useState(false);
  const divElement = useRef<HTMLInputElement>(null);
  // close when clicked on anywhere in screen
  useEffect(() => {
    // React.ChangeEvent<HTMLInputElement>;

    function handleClick(event: Event) {
      if (!divElement.current) {
        return;
      }
      if (
        event.target instanceof HTMLElement &&
        !divElement.current?.contains(event.target)
      ) {
        setIsDrop(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setIsDrop]);

  const menuHandler = () => {
    setIsDrop((prevIsOpen: boolean) => !prevIsOpen);
  };

  const renderedOption = options.map((option) => {
    return (
      <div key={option.value} onClick={() => option.handler()}>
        {option.label}
      </div>
    );
  });
  return (
    <div ref={divElement} className="dropDown">
      <div onClick={menuHandler} className="dropdown__header">
        <div className="dropdown__name">
          {name !== "" && (
            <>
              {name}
              <GoChevronDown />
            </>
          )}
        </div>
      </div>
      {isDrop && (
        <Panels
          className={
            isDrop ? "dropdown__content extended" : "dropdown__content"
          }
        >
          {renderedOption}
        </Panels>
      )}
    </div>
  );
}
