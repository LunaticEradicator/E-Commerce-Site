import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../../components/Reuseable/Button";
import Message from "../../../components/Reuseable/Message";
import { addItemsToCart, removeCartItems } from "../../../store/store";

export default function CartItems() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const updateCartHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    product: object
  ) => {
    dispatch(addItemsToCart({ ...product, qty: event.target.value }));
  };

  const removeItemHandler = (id) => {
    console.log(id);
    dispatch(removeCartItems(id));
  };

  const renderedCart = cartItems.map((item) => {
    return (
      <div key={item._id}>
        <div className="main__cart__item__details__product">
          <div className="main__cart__item__details__product__header">
            <div className="main__cart__item__details__product__header__image">
              <img
                src={
                  item?.img.includes("upload")
                    ? `http://localhost:8080${item?.img}`
                    : item?.img
                }
                alt={item.name}
              />
            </div>
            <div className="main__cart__item__details__product__header__name">
              <Link to={`/products/${item._id}`}>{item.name}</Link>
            </div>
          </div>
          <div className="main__cart__item__details__product__price">
            <span>${item.price}</span>
          </div>

          <div className="main__cart__item__details__product__qty">
            <form action="#">
              <select
                onChange={() => updateCartHandler(event, item)}
                name="cart"
                value={item.qty}
              >
                {[...Array(item.countInStock).keys()].map((x) => {
                  return (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
          <Button className="main__cart__item__details__product__delete">
            <FaTrash onClick={() => removeItemHandler(item._id)} />
          </Button>
        </div>
        <hr />
        <div></div>
      </div>
    );
  });
  return (
    <>
      {cartItems.length > 0 ? (
        renderedCart
      ) : (
        <Message>
          Your Cart is empty <Link to="/">Go Back</Link>
        </Message>
      )}
    </>
  );
}
