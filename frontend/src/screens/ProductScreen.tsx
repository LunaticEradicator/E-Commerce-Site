// import axios from "axios";
// import products from "../products";
import "../sass/screens/productScreen.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import SkeltonLoader from "../components/Reuseable/SkeltonLoader.tsx";
import {
  useGetSingleProductQuery,
  useCreateProductReviewMutation,
} from "../store/apis/productsApi.ts";
import { toast } from "react-toastify";
import Button from "../components/Reuseable/Button";
import Rating from "../components/Reuseable/Rating";
import Message from "../components/Reuseable/Message.tsx";

import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../store/store.ts";
import Reviews from "./utils/Product/Reviews.tsx";
import FormContainer from "../components/Reuseable/FormContainer.tsx";

export default function ProductScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    qty: 1,
    comment: "",
    rating: 0,
    topic: "",
  });
  console.log(formData);
  // const [qty, setQty] = useState(1);
  // const [comment, setComment] = useState("");
  // const [rating, setRating] = useState(0);

  const { id: productId } = useParams();
  const {
    data: selectedProduct,
    isLoading,
    isError,
    refetch,
  } = useGetSingleProductQuery(productId);
  // console.log(selectedProduct);
  const [createReview, { isLoading: productReviewLoading }] =
    useCreateProductReviewMutation();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    // setQty(value);
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const addToCartHandler = () => {
    console.log("Clicked");
    navigate("/cart");
    dispatch(addItemsToCart({ ...selectedProduct, qty: formData?.qty }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await createReview({
        productId: productId,
        topic: formData?.topic,
        rating: formData?.rating,
        comment: formData?.comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted");
      // reset to default
      setFormData((prevFormData) => {
        return { ...prevFormData, comment: "", rating: 0 };
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  let renderedSingleProduct;
  if (isLoading) {
    renderedSingleProduct = <SkeltonLoader times={2} className="defaultDiv" />;
  } else if (isError) {
    renderedSingleProduct = <Message danger>Error</Message>;
  } else {
    renderedSingleProduct = (
      <>
        <div className="main__productDisplayed__content">
          <div className="main__productDisplayed__content__top">
            <img
              src={
                selectedProduct?.img.includes("upload")
                  ? `http://localhost:8080${selectedProduct?.img}`
                  : selectedProduct?.img
              }
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

            {selectedProduct?.countInStock > 0 && (
              <div className="main__productDisplayed__content__middle__selectQty">
                <form action="">
                  <select
                    onChange={handleInput}
                    name="qty"
                    value={formData?.qty}
                  >
                    {[...Array(selectedProduct?.countInStock).keys()].map(
                      (x) => {
                        return (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        );
                      }
                    )}
                  </select>
                </form>
              </div>
            )}

            <div className="main__productDisplayed__content__middle__addToCart">
              {/* <Button disabled primary rounded> */}
              <Button
                onClick={addToCartHandler}
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
        <div className="main__productDisplayed__reviews">
          {selectedProduct.reviews.length > 0 && (
            <Message header className="main__productDisplayed__reviews__header">
              Reviews
            </Message>
          )}

          <div className="main__productDisplayed__reviews__content">
            {selectedProduct.reviews.length === 0 && (
              <Message>No Reviews</Message>
            )}
            {selectedProduct.reviews.map((review) => {
              return (
                <div className="main__productDisplayed__reviews__content__info">
                  <h2>{review?.name}</h2>
                  <div className="main__productDisplayed__reviews__content__info__div">
                    <strong>{review?.topic}</strong>
                    <Rating rating={review?.rating} reviewCount={""} />
                  </div>
                  <p>{review?.comment}</p>
                  <p>
                    Reviewed On :{" "}
                    <strong>{review?.createdAt.substring(0, 10)}</strong>
                  </p>
                </div>
              );
              // <Reviews {...review} selectedProduct={selectedProduct} />;
            })}
            <hr />
            {userInfo ? (
              <div className="main__productDisplayed__reviews__content__create">
                <Message
                  header
                  className="main__productDisplayed__reviews__content__create__header"
                >
                  Write a Review
                </Message>
                <FormContainer>
                  <form action="#" onSubmit={submitHandler}>
                    <div className="main__productDisplayed__reviews__content__create__topic">
                      <label htmlFor="topic">Header</label>
                      <textarea
                        name="topic"
                        id="topic"
                        cols="10"
                        rows="1"
                        value={formData?.topic}
                        onChange={handleInput}
                        required
                      ></textarea>
                    </div>
                    <div className="main__productDisplayed__reviews__content__create__comment">
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        name="comment"
                        id="comment"
                        cols="10"
                        rows="2"
                        value={formData?.comment}
                        onChange={handleInput}
                        required
                      ></textarea>
                    </div>
                    <div className="main__productDisplayed__reviews__content__create__rating">
                      <label htmlFor="rating">Rating</label>
                      <select
                        name="rating"
                        id="rating"
                        value={formData?.rating}
                        onChange={handleInput}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair </option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="main__productDisplayed__reviews__content__create__button">
                      <Button
                        rounded
                        primary
                        loading={productReviewLoading}
                        disabled={productReviewLoading}
                      >
                        Submit Review
                      </Button>
                    </div>
                  </form>
                </FormContainer>
              </div>
            ) : (
              <Message>
                {" "}
                Please <Link to="/login">login</Link> to write a review
              </Message>
            )}
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

// const [selectedProduct, setSelectedProduct] = useState();
//  navigate to different dynamic productId [main.tsx=>Route]

// useEffect(() => {
//   const fetchSelectedProduct = async () => {
//     const { data } = await axios.get(`/api/products/${productId}`);
//     setSelectedProduct(data);
//   };
//   fetchSelectedProduct();
// }, [productId]);

// const { id: productId } = useParams();
// // will show the product[by id] details which to be displayed on the ProductScreen
// const productDisplayed = products.find((p) => {
//   return p._id === productId;
// });
