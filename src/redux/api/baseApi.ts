import { authKey } from "@/constants/auth-key";
import { getFromLocalStorage } from "@/utils/local-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  prepareHeaders: (headers) => {
    const token = getFromLocalStorage(authKey);
    if (token) {
      headers.set("Authorization", JSON.parse(token));
    }

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["user", "skills", "projects", "blogs"],
  endpoints: () => ({}),
});
