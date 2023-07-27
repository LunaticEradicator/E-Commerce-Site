import products from "../products";
import Panels from "../components/Reuseable/Panels";
import "../sass/components/homeScreen.scss";
import { Link } from "react-router-dom";
import Rating from "../components/Reuseable/Rating";

export default function HomeScreen() {
  const renderDetail = products.map((product) => {
    return (
      <Panels key={product._id} className="main__product__panel">
        <Link to={`product/${product._id}`}>
          <img className="main__product__img" src={product.img} alt="img" />
        </Link>
        <div className="main__product__title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </div>
        <Rating
          rating={product.stats.rating}
          reviewCount={product.stats.reviewCount}
        />
        <div className="main__product__price">${product.price}</div>
      </Panels>
    );
  });
  return <div className="main__product">{renderDetail}</div>;
}
