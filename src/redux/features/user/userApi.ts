import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
