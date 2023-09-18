import "../../sass/components/dropDownAdmin.scss";
import Panels from "./Panels";
import { useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface postProp {
  options: { label: string; value: string; handler: () => void }[];
  isDropAdmin: boolean;
  setIsDropAdmin: any;
  // setIsDrop: (value: boolean) => void | any;
}

export default function DropDownAdmin({
  options,
  isDropAdmin,
  setIsDropAdmin,
}: postProp) {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const divElement = useRef<HTMLInputElement>(null);
  useEffect(() => {
    // close when clicked on anywhere in screen
    function handleClick(event: Event) {
      if (!divElement.current) {
        return;
      }
      if (
        event.target instanceof HTMLElement &&
        !divElement.current.contains(event.target)
      ) {
        setIsDropAdmin(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setIsDropAdmin]);

  const menuHandler = () => {
    setIsDropAdmin((prevIsOpen: boolean) => !prevIsOpen);
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
        {userInfo && userInfo.isAdmin && (
          <div className="dropdown__name">
            Admin
            <GoChevronDown />
          </div>
        )}
      </div>
      {isDropAdmin && (
        <Panels
          className={
            isDropAdmin
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
