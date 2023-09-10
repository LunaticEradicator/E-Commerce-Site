import "../sass/screens/homeScreen.scss";
import { Link } from "react-router-dom";
import SkeltonLoader from "../components/Reuseable/SkeltonLoader";
import { useParams } from "react-router-dom";
// //  import axios from "axios";
// // import { useState, useEffect } from "react";
import { useGetProductsQuery } from "../store/apis/productsApi";

import Panels from "../components/Reuseable/Panels";
import Rating from "../components/Reuseable/Rating";
import Message from "../components/Reuseable/Message";
import Paginate from "../components/Reuseable/Paginate";
// import products from "../products"; [frontend we map through it]

export default function HomeScreen() {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  // without pagination
  // const { data: products, isLoading, isError } = useGetProductsQuery();

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
    renderDetail = data?.products.map((product) => {
      return (
        <Panels key={product._id} className="main__product__panel">
          <Link to={`/products/${product._id}`}>
            <img
              className="main__product__img"
              //? If the image is from backend change server to 8080
              //? [Took 2 days to fix]
              //? see ProductEditScreen
              src={
                product?.img.includes("upload")
                  ? `http://localhost:8080${product?.img}`
                  : product?.img
              }
              // src={product?.img}
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

  return (
    <>
      <h1>Latest Product</h1>
      <div className="main__product">{renderDetail}</div>
      <Paginate
        page={data.page}
        pages={data.pages}
        isAdmin={false}
        keyword={keyword ? keyword : ""}
      />
    </>
  );
}
