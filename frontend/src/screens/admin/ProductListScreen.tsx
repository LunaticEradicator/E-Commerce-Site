// import React from "react";
import "../../sass/screens/admin/productListScreen.scss";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "../../components/Reuseable/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../store/apis/productsApi";
import Message from "../../components/Reuseable/Message";
import SkeltonLoader from "../../components/Reuseable/SkeltonLoader";

export default function ProductListScreen() {
  let renderedProductList;
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();
  //   console.log(products);
  const deleteBtnHandler = (id: number) => {
    console.log(id);
  };
  const createProductHandler = async () => {
    if (window.confirm("Create A New Sample Product")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  // if (isLoading) {
  //   renderedProductList = <SkeltonLoader times={1} className="defaultDiv" />;
  // } else
  if (isError) {
    renderedProductList = <Message danger>Error Loading Page</Message>;
  } else {
    renderedProductList = products?.map((product) => {
      return (
        <tr key={product._id}>
          <td data-label="ID">{product._id}</td>
          <td data-label="Name">{product.name}</td>
          <td data-label="Price">{product.price}</td>
          <td data-label="CATEGORIES">{product.category.toUpperCase()}</td>
          <td data-label="BRAND">{product.brand.toUpperCase()}</td>
          <td>
            <Button rounded className="productList__editButton">
              <Link to={`/admin/product/${product._id}/edit`}>
                <FaEdit style={{ color: "black", width: "15px" }} />
              </Link>
            </Button>
          </td>
          <td>
            <Button
              onClick={() => deleteBtnHandler(product._id)}
              rounded
              className="productList__deleteButton"
            >
              <FaTrash style={{ color: "white", width: "15px" }} />
            </Button>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="productList">
      {isLoading ? (
        <SkeltonLoader times={1} className="defaultDiv" />
      ) : (
        <>
          <div className="productList__header">
            <div className="productList__header__title">Products</div>
            <Button
              onClick={createProductHandler}
              disabled={createProductLoading}
              loading={createProductLoading}
              rounded
              secondary
              className="productList__header__button"
            >
              Create Product
            </Button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORIES</th>
                <th>BRAND</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderedProductList}</tbody>
          </table>
        </>
      )}
    </div>
  );
}
