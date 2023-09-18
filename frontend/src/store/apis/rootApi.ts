import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
const rootApi = createApi({
  reducerPath: "root",
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  endpoints: () => ({}),
});
export { rootApi };
