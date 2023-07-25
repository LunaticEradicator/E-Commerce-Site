import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type propRating = {
  rating: number;
  reviewCount: number;
};

export default function Rating({ rating, reviewCount }: propRating) {
  function createStar(a: number, b: number) {
    if (rating >= a) {
      return <FaStar />;
    } else if (rating >= b) {
      return <FaStarHalfAlt />;
    } else {
      return <FaRegStar />;
    }
  }

  const starOne = <span>{createStar(1, 0.5)}</span>;
  const starTwo = <span>{createStar(2, 1.5)}</span>;
  const starThree = <span>{createStar(3, 2.5)}</span>;
  const starFour = <span>{createStar(4, 3.5)}</span>;
  const starFive = <span>{createStar(5, 4.5)}</span>;

  return (
    <div className="main__product__status">
      {reviewCount && starOne}
      {reviewCount && starTwo}
      {reviewCount && starThree}
      {reviewCount && starFour}
      {reviewCount && starFive}
      <span className="main__product__status__reviews">{` ${reviewCount} reviews`}</span>
    </div>
  );
}
