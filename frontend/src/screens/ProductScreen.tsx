import "../sass/components/productScreen.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
import SkeltonLoader from "../components/Reuseable/SkeltonLoader.tsx";
import { useGetSingleProductQuery } from "../store/apis/productsApi.ts";

// import products from "../products";
import Button from "../components/Reuseable/Button";
import Rating from "../components/Reuseable/Rating";

export default function ProductScreen() {
  const { id: productId } = useParams();
  const {
    data: selectedProduct,
    isLoading,
    isError,
  } = useGetSingleProductQuery(productId);
  // const [selectedProduct, setSelectedProduct] = useState();
  //  navigate to different dynamic productId [main.tsx=>Route]

  // useEffect(() => {
  //   const fetchSelectedProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setSelectedProduct(data);
  //   };
  //   fetchSelectedProduct();
  // }, [productId]);

  console.log(selectedProduct);
  console.log(productId);

  let renderedSingleProduct;
  if (isLoading) {
    renderedSingleProduct = <SkeltonLoader times={2} className="defaultDiv" />;
  } else if (isError) {
    renderedSingleProduct = <div>'Error'</div>;
  } else {
    renderedSingleProduct = (
      <>
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
                reviewCount={selectedProduct?.reviewCount}
                rating={selectedProduct?.rating}
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
      </>
    );
  }
  return (
    <div className="main__productDisplayed">
      <div className="main__productDisplayed__header">
        <Link to="/">
          <Button secondary rounded outline>
            Go Back
          </Button>
        </Link>
      </div>
      {renderedSingleProduct}
    </div>
  );
}

// frontend
// const { id: productId } = useParams();
// // will show the product[by id] details which to be displayed on the ProductScreen
// const productDisplayed = products.find((p) => {
//   return p._id === productId;
// });
