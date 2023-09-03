import { rootApi } from "./rootApi.ts";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productsApi = rootApi.injectEndpoints({
  // will be calling as useGetProductsQuery
  endpoints: (builder) => ({
    getProducts: builder.query<void, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "GET",
      }),
      providesTags: ["Products"],
      keepUnusedDataFor: 5,
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/edit`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productsApi;
