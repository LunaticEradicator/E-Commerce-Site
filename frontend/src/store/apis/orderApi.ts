import { rootApi } from "./rootApi";
import { ORDERS_URL } from "../constants";

const orderApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
