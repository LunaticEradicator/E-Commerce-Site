import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../../sass/components/rating.scss";
import classNames from "classnames";

type propRating = {
  rating: number;
  reviewCount: number;
  className: string;
};

export default function Rating({ rating, reviewCount, className }: propRating) {
  function createStar(a: number, b: number) {
    if (rating >= a) {
      return <FaStar />;
    } else if (rating >= b) {
      return <FaStarHalfAlt />;
    } else {
      return <FaRegStar />;
    }
  }

  const style = classNames(
    "main__product__user",
    className !== "" ? className : ""
  );

  const starOne = <span>{createStar(1, 0.5)}</span>;
  const starTwo = <span>{createStar(2, 1.5)}</span>;
  const starThree = <span>{createStar(3, 2.5)}</span>;
  const starFour = <span>{createStar(4, 3.5)}</span>;
  const starFive = <span>{createStar(5, 4.5)}</span>;

  return (
    // <div className={"main__product__user"}>
    <div className={style}>
      <div className="main__product__user__ratings">
        {starOne}
        {starTwo}
        {starThree}
        {starFour}
        {starFive}
      </div>
      <span className="main__product__user__reviews">
        {reviewCount && ` ${reviewCount} reviews`}
      </span>
    </div>
  );
}
