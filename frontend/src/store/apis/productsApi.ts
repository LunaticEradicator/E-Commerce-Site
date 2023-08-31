import { rootApi } from "./rootApi.ts";
import { PRODUCTS_URL } from "../constants";

export const productsApi = rootApi.injectEndpoints({
  // will be calling as useGetProductsQuery
  endpoints: (builder) => ({
    getProducts: builder.query<void, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "GET",
      }),
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
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
} = productsApi;
