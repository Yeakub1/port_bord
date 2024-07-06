import { baseApi } from "@/redux/api/baseApi";

const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    editBlog: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `/blogs/${blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
