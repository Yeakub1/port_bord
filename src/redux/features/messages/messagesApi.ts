import { baseApi } from "@/redux/api/baseApi";

const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: "/messages",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
