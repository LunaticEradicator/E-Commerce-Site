import "../../../sass/screens/admin/productEditScreen.scss";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/Reuseable/Button";
import Message from "../../../components/Reuseable/Message";
import FormContainer from "../../../components/Reuseable/FormContainer";
import { toast } from "react-toastify";
import SkeltonLoader from "../../../components/Reuseable/SkeltonLoader";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../../store/apis/productsApi";
import Meta from "../../../components/Reuseable/Meta";
import Loader from "../../../components/Reuseable/Loader";

export default function ProductEditScreen() {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    img: "",
    brand: "",
    category: "",
    countInStock: 0,
  });
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetSingleProductQuery(productId);
  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: uploadProductImageLoading }] =
    useUploadProductImageMutation();
  useEffect(() => {
    if (!isLoading) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          name: product?.name,
          img: product?.img,
          brand: product?.brand.toUpperCase(),
          category: product?.category.toUpperCase(),
          price: product?.price,
          description: product?.description,
          countInStock: product?.countInStock,
        };
      });
    }
  }, [product, isLoading]);

  const formDataHandler = (event) => {
    const { value, name } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  const uploadFileHandler = async (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);
    console.log(formData.get("image"));
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setFormData((prevFormData) => {
        return { ...prevFormData, img: res.image };
      });
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await updateProduct({
        productId,
        name: formData?.name,
        img: formData?.img,
        brand: formData?.brand,
        price: formData?.price,
        description: formData?.description,
        category: formData?.category,
        countInStock: formData?.countInStock,
      });
      toast.success("Product Updated Successfully");
      navigate("/admin/productList");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  let rendererSingleProduct;
  if (isLoading) {
    rendererSingleProduct = <Loader />;
  } else if (isError) {
    rendererSingleProduct = <Message danger>Error</Message>;
  } else {
    rendererSingleProduct = (
      <FormContainer>
        <form
          onSubmit={submitHandler}
          className="main__product__edit__formContainer"
          // encType="multipart/form-data"
          action="#"
        >
          <div className="main__product__edit__formContainer__name">
            <label htmlFor="name">Name</label>
            <input
              onChange={() => formDataHandler(event)}
              type="text"
              name="name"
              id="name"
              placeholder=""
              required
              value={formData?.name}
            />
          </div>
          <div className="main__product__edit__formContainer__brand">
            <label htmlFor="brand">Brand</label>
            <input
              onChange={() => formDataHandler(event)}
              type="text"
              name="brand"
              id="brand"
              placeholder=""
              required
              value={formData?.brand}
            />
          </div>
          <div className="main__product__edit__formContainer__category">
            <label htmlFor="category">Category</label>
            <input
              onChange={() => formDataHandler(event)}
              type="text"
              name="category"
              id="category"
              placeholder=""
              required
              value={formData?.category}
            />
          </div>
          {/* If the image is from backend change server to 8080 */}
          {/* Took 2days to fix */}
          {/* See Home Screen */}
          <div className="main__product__edit__formContainer__image">
            <label htmlFor="img">Image</label>
            <input
              onChange={() => formDataHandler(event)}
              type="text"
              name="img"
              className="main__product__edit__formContainer__image__one"
              placeholder="Enter Image URL"
              required
              value={formData?.img}
            />
            <input
              className="main__product__edit__formContainer__image__two"
              type="file"
              onChange={uploadFileHandler}
            />
          </div>
          <div className="main__product__edit__formContainer__price">
            <label htmlFor="price">Price</label>
            <input
              onChange={() => formDataHandler(event)}
              type="number"
              name="price"
              id="price"
              placeholder=""
              required
              value={formData?.price}
            />
          </div>
          <div className="main__product__edit__formContainer__description">
            <label htmlFor="description">Description</label>
            <input
              onChange={() => formDataHandler(event)}
              type="text"
              name="description"
              id="description"
              placeholder=""
              required
              value={formData?.description}
            />
          </div>
          <div className="main__product__edit__formContainer__countInStock">
            <label htmlFor="countInStock">Items In Stock</label>
            <input
              onChange={() => formDataHandler(event)}
              type="number"
              name="countInStock"
              id="countInStock"
              placeholder=""
              required
              value={formData?.countInStock}
            />
          </div>
          <Button
            className="main__product__edit__formContainer__updateBtn"
            secondary
            rounded
            loading={updateProductLoading}
            disabled={updateProductLoading}
          >
            Update Product
          </Button>
        </form>
      </FormContainer>
    );
  }
  return (
    <div className="main__product__edit">
      <Meta title={product?.name} />
      <Link to="/admin/productList">
        <Button
          className="main__product__edit__goBackBtn"
          secondary
          outline
          rounded
        >
          Go Back
        </Button>
      </Link>
      <div className="main__product__edit__header">Edit Product</div>
      {rendererSingleProduct}
    </div>
  );
}
