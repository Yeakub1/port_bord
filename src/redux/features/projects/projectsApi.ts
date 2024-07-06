import { baseApi } from "@/redux/api/baseApi";

const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    editProject: builder.mutation({
      query: ({ projectId, data }) => ({
        url: `/project/${projectId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["projects"],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/project/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
