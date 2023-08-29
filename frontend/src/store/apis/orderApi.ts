import { rootApi } from "./rootApi";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

const orderApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
    getMyOrderById: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    //  !!fix
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
        method: "GET",
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
        // method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrdersAdmin: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrderByIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersAdminQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} = orderApi;
