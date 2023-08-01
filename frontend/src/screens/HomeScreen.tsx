import "../sass/components/homeScreen.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import Panels from "../components/Reuseable/Panels";
import Rating from "../components/Reuseable/Rating";

// import products from "../products"; [frontend we map through it]

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products"); // no need to add localhost since we added proxy in package.json
      const data = response.data;
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // console.log(products);

  const renderDetail = products.map((product) => {
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
  return <div className="main__product">{renderDetail}</div>;
}
