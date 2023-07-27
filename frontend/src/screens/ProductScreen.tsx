import "../sass/components/productScreen.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import products from "../products";
import Button from "../components/Reuseable/Button";
import Rating from "../components/Reuseable/Rating";

export default function ProductScreen() {
  //  navigate to different dynamic productId [main.tsx=>Route]
  const { productId } = useParams();

  // will show the product[by id] details which to be displayed on the ProductScreen
  const productDisplayed = products.find((p) => {
    return p._id === parseInt(productId);
  });

  console.log(productDisplayed);
  console.log(productId);
  return (
    <div className="main__productDisplayed">
      <div className="main__productDisplayed__header">
        <Link to="/">
          <Button secondary rounded outline>
            Go Back
          </Button>
        </Link>
      </div>

      <div className="main__productDisplayed__content">
        <div className="main__productDisplayed__content__top">
          <img
            src={productDisplayed?.img}
            alt={productDisplayed?.name}
            className="main__productDisplayed__content__top__img"
          />
        </div>

        <div className="main__productDisplayed__content__middle">
          <div className="main__productDisplayed__content__middle__name">
            <div className="main__productDisplayed__content__middle__name__title">
              {productDisplayed?.name}
            </div>
            <Rating
              reviewCount={productDisplayed?.stats.reviewCount}
              rating={productDisplayed?.stats.rating}
              className="addPadding" // to fix padding [found in rating.scss]
            />
          </div>

          <div className="main__productDisplayed__content__middle__price">
            <div className="main__productDisplayed__content__middle__price__stocks">
              ${productDisplayed?.price}
            </div>
            <div className="main__productDisplayed__content__middle__price__stocks">
              {productDisplayed?.countInStock > 0
                ? "[ In-Stock ]"
                : "[ Out-Of-Stock ]"}
            </div>
          </div>

          <div className="main__productDisplayed__content__middle__addToCart">
            {/* <Button disabled primary rounded> */}
            <Button
              disabled={productDisplayed?.countInStock === 0}
              primary
              rounded
            >
              Add To Cart{" "}
            </Button>
          </div>

          <div className="main__productDisplayed__content__middle__description">
            <p className="main__productDisplayed__content__middle__description__desc">
              {productDisplayed?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="main__productDisplayed__content__bottom__stock">
  <h3>{productDisplayed?.countInStock > 0 ? "In-Stock" : "Out-Of-Stock"}</h3>
</div>; */
}
