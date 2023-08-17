import "../../sass/components/dropDown.scss";
import Panels from "./Panels";
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";

export default function DropDown({ options, name }) {
  const [isDrop, setIsDrop] = useState(false);
  const divElement = useRef();
  // close when clicked on anywhere in screen
  useEffect(() => {
    function handleClick(event: React.ChangeEvent<HTMLInputElement>) {
      if (!divElement.current) {
        return;
      }
      if (!divElement.current.contains(event.target)) {
        setIsDrop(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const menuHandler = () => {
    setIsDrop((prevIsOpen) => !prevIsOpen);
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
      <Panels onClick={menuHandler} className="dropdown__header">
        <Panels className="dropdown__name">{name !== "" && name}</Panels>
        {name !== "" && <GoChevronDown />}
      </Panels>
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
