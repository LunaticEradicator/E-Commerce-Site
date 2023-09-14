import "../../sass/components/searchBox.scss";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "./Button";

export default function SearchBox() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState(keyword || "");
  // console.log(searchValue);
  const submitHandler = (event) => {
    event.preventDefault();
    //   searchValue
    if (keyword !== "") {
      navigate(`/search/${searchValue}`);
      setSearchValue("");
    } else {
      navigate(`/`);
    }
    console.log("Submitted");
  };
  return (
    <div className="searchBox">
      <form className="searchBox__form" onSubmit={submitHandler} action="#">
        <div className="searchBox__form__search">
          <input
            type="text"
            id="searchBox"
            value={searchValue}
            placeholder="Search..."
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <Button outline rounded>
            <FaSearch />
          </Button>
        </div>
      </form>
    </div>
  );
}
