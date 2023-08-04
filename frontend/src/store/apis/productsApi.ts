import { rootApi } from "./rootApi.ts";
import { PRODUCTS_URL } from "../constants";

export const productsApi = rootApi.injectEndpoints({
  // will be calling as useGetProductsQuery
  endpoints: (builder) => ({
    getProducts: builder.query<void, void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApi;
