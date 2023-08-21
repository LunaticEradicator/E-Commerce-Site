import { rootApi } from "./rootApi";
import { BASE_URL } from "../constants";

const orderApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrderItem: builder.mutation({
      query: (order) => ({
        url: BASE_URL,
        method: "POST",
        body: { ...order },
      }),
    }),
  }),
});

export const { useAddOrderItemMutation } = orderApi;
