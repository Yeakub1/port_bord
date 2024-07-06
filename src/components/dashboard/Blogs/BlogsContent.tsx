import LargeSpinner from "@/components/Spinner/LargeSpinner";
import { useGetBlogsQuery } from "@/redux/features/blogs/blogsApi";
import React, { useEffect } from "react";
import SingleBlog from "./SingleBlog";

const BlogsContent = () => {
  const { data: blogsData, error, refetch } = useGetBlogsQuery(undefined);

  useEffect(() => {
    if (error) {
      const retryTimeout = setTimeout(() => {
        refetch();
      }, 2000);

      return () => clearTimeout(retryTimeout);
    }
  }, [error, refetch]);

  return (
    <div>
      {!blogsData && <LargeSpinner />}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {blogsData?.data?.map((blog: any) => (
          <SingleBlog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsContent;
