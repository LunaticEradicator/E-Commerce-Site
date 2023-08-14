import "../sass/components/homeScreen.scss";
import { Link } from "react-router-dom";
import SkeltonLoader from "../components/Reuseable/SkeltonLoader";
// //  import axios from "axios";
// // import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../store/apis/productsApi";

import Panels from "../components/Reuseable/Panels";
import Rating from "../components/Reuseable/Rating";
import Message from "../components/Reuseable/Message";
// import products from "../products"; [frontend we map through it]

export default function HomeScreen() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  // // console.log(useGetProductsQuery());
  // // const [products, setProducts] = useState([]);

  // // useEffect(() => {
  // //   const fetchProducts = async () => {
  // //     const response = await axios.get("/api/products"); // no need to add localhost since we added proxy in package.json
  // //     const data = response.data;
  // //     setProducts(data);
  // //   };
  // //   fetchProducts();
  // // }, []);
  // console.log(products);

  let renderDetail;
  if (isLoading) {
    // renderDetail = <h2 style={{ textAlign: "center" }}>Loading Data ....</h2>;
    renderDetail = <SkeltonLoader times={6} className="defaultDiv" />;
    return renderDetail;
  } else if (isError) {
    renderDetail = <Message danger>Error</Message>;
  } else {
    <h1>Latest Product</h1>;
    renderDetail = products.map((product) => {
      return (
        <Panels key={product._id} className="main__product__panel">
          <Link to={`products/${product._id}`}>
            <img className="main__product__img" src={product.img} alt="img" />
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

  return (
    <>
      <h1>Latest Product</h1>
      <div className="main__product">{renderDetail}</div>
    </>
  );
}
