import "../sass/screens/homeScreen.scss";
import "../sass/components/carousel.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Reuseable/Loader";
import { useParams } from "react-router-dom";
import Carousel from "../components/Reuseable/Carousel";
// //  import axios from "axios";
// // import { useState, useEffect } from "react";
import {
  useGetProductsQuery,
  useGetTopRatedProductQuery,
} from "../store/apis/productsApi";

import Panels from "../components/Reuseable/Panels";
import Rating from "../components/Reuseable/Rating";
import Message from "../components/Reuseable/Message";
import Paginate from "../components/Reuseable/Paginate";
import Meta from "../components/Reuseable/Meta";
// import products from "../products"; [frontend we map through it]

export default function HomeScreen() {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  // without pagination
  // const { data: products, isLoading, isError } = useGetProductsQuery();
  const {
    data: topRatedProduct,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useGetTopRatedProductQuery();

  let renderDetail;
  // to make carousel responsive
  // we are checking the updated screen width
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  // console.log(windowSize);

  if (isLoading || topRatedLoading) {
    // renderDetail = <h2 style={{ textAlign: "center" }}>Loading Data ....</h2>;
    // renderDetail = <SkeltonLoader times={6} className="defaultDiv" />;
    renderDetail = <Loader />;
    return renderDetail;
  } else if (isError || topRatedError) {
    renderDetail = <Message danger>Error</Message>;
  } else {
    renderDetail = data?.products.map((product: any) => {
      return (
        <Panels key={product._id} className="main__product__panel">
          <Link to={`/products/${product._id}`}>
            <img
              className="main__product__img"
              //? Multer res.send changed from filepath to filename
              //? If img-name does not contain 'images'
              //? then we will add '/uploads/img-name'
              //? since multer img-name only has 'filename'
              src={
                product?.img.includes("images")
                  ? product?.img
                  : `/uploads/${product?.img}`
              }
              alt="img"
            />
          </Link>
          <div className="main__product__title">
            <Link to={`/products/${product._id}`}>{product.name}</Link>
          </div>
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
          <div className="main__product__price">${product.price}</div>
        </Panels>
      );
    });
  }
  const responsiveCarousel = () => {
    if (windowSize > 768 && windowSize <= 1024) {
      return 980;
    } else if (windowSize > 425 && windowSize <= 768) {
      return 680;
    } else if (windowSize > 375 && windowSize <= 425) {
      return 400;
    } else if (windowSize > 320 && windowSize <= 375) {
      return 360;
    } else if (windowSize <= 320) {
      return 300;
    } else {
      return 1350;
    }
  };
  return (
    <>
      <Meta title={"E-Commerce"} />
      {!keyword && (
        <div className="carousel">
          {/* fix for smaller screen */}
          <Carousel
            slides={topRatedProduct!}
            parentWidth={responsiveCarousel()}
          />
        </div>
      )}
      <h1 className="main__featured">Featured Product</h1>
      <div className="main__product">{renderDetail}</div>
      <Paginate
        page={data?.page}
        pages={data?.pages}
        isAdmin={false}
        keyword={keyword ? keyword : ""}
      />
    </>
  );
}

// console.log(useGetProductsQuery());
// const [products, setProducts] = useState([]);

// useEffect(() => {
//   const fetchProducts = async () => {
//     const response = await axios.get("/api/products"); // no need to add localhost since we added proxy in package.json
//     const data = response.data;
//     setProducts(data);
//   };
//   fetchProducts();
// }, []);
// console.log(products);
