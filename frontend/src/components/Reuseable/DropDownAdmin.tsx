import "../../sass/components/dropDownAdmin.scss";
import Panels from "./Panels";
import { useEffect, useRef, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { useSelector } from "react-redux";

export default function DropDownAdmin({ options, name }) {
  const { userInfo } = useSelector((state) => state.auth);
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
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown__name">
            Admin
            <GoChevronDown />
          </div>
        )}
      </Panels>
      {isDrop && (
        <Panels
          className={
            isDrop
              ? "dropdown__content__admin extended"
              : "dropdown__content__admin"
          }
        >
          {renderedOption}
        </Panels>
      )}
    </div>
  );
}