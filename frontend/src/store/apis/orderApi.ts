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
    getPayPalClientId: builder.query<any, void>({
      query: () => ({
        url: PAYPAL_URL,
        method: "GET",
      }),
    }),
    getMyOrders: builder.query<Array<any>, void>({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
        // method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrdersAdmin: builder.query<Array<any>, void>({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    deliveryOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
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
  useDeliveryOrderMutation,
} = orderApi;
