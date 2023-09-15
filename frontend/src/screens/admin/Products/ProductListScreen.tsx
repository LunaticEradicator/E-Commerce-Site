// import React from "react";
import "../../../sass/screens/admin/productListScreen.scss";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Button from "../../../components/Reuseable/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../../store/apis/productsApi";
import Message from "../../../components/Reuseable/Message";
import Paginate from "../../../components/Reuseable/Paginate";
import Loader from "../../../components/Reuseable/Loader";
import Meta from "../../../components/Reuseable/Meta";

export default function ProductListScreen() {
  const { pageNumber } = useParams();
  let renderedProductList;
  //  with pagination
  const { data, isLoading, isError, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation();
  console.log(data?.products);
  const deleteBtnHandler = async (id: number) => {
    try {
      if (window.confirm(`Delete selected Product`)) {
        await deleteProduct(id);
        toast.success("Product Deleted");
        refetch();
      }
    } catch (error) {
      toast.error("Cannot Delete Product");
    }
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
    renderedProductList = data?.products?.map((product) => {
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
              disabled={deleteProductLoading}
              loading={deleteProductLoading}
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
      <Meta title={"Products"} />
      {isLoading ? (
        <Loader />
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
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </div>
  );
}
