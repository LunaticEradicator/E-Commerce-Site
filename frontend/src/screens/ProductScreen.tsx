import "../sass/components/productScreen.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

// import products from "../products";
import Button from "../components/Reuseable/Button";
import Rating from "../components/Reuseable/Rating";

export default function ProductScreen() {
  const [selectedProduct, setSelectedProduct] = useState();
  //  navigate to different dynamic productId [main.tsx=>Route]
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchSelectedProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setSelectedProduct(data);
    };
    fetchSelectedProduct();
  }, [productId]);

  console.log(selectedProduct);
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
            src={selectedProduct?.img}
            alt={selectedProduct?.name}
            className="main__productDisplayed__content__top__img"
          />
        </div>

        <div className="main__productDisplayed__content__middle">
          <div className="main__productDisplayed__content__middle__name">
            <div className="main__productDisplayed__content__middle__name__title">
              {selectedProduct?.name}
            </div>
            <Rating
              reviewCount={selectedProduct?.stats.reviewCount}
              rating={selectedProduct?.stats.rating}
              className="addPadding" // to fix padding [found in rating.scss]
            />
          </div>

          <div className="main__productDisplayed__content__middle__price">
            <div className="main__productDisplayed__content__middle__price__stocks">
              ${selectedProduct?.price}
            </div>
            <div className="main__productDisplayed__content__middle__price__stocks">
              {selectedProduct?.countInStock > 0
                ? "[ In-Stock ]"
                : "[ Out-Of-Stock ]"}
            </div>
          </div>

          <div className="main__productDisplayed__content__middle__addToCart">
            {/* <Button disabled primary rounded> */}
            <Button
              disabled={selectedProduct?.countInStock === 0}
              primary
              rounded
            >
              Add To Cart{" "}
            </Button>
          </div>

          <div className="main__productDisplayed__content__middle__description">
            <p className="main__productDisplayed__content__middle__description__desc">
              {selectedProduct?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// frontend
// const { id: productId } = useParams();
// // will show the product[by id] details which to be displayed on the ProductScreen
// const productDisplayed = products.find((p) => {
//   return p._id === productId;
// });
