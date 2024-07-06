"use client";
import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { useDeleteBlogMutation } from "@/redux/features/blogs/blogsApi";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import EditBlogModal from "../Modal/EditBlogModal";

const SingleBlog = ({ blog }: { blog: any }) => {
  const [isEditBlog, setIsEditBlog] = useState(false);
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const handleDelete = async () => {
    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!deleteConfirmation) {
      return;
    }

    try {
      const result = await deleteBlog(blog.id).unwrap();
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="shadow-sm shadow-gray-400 flex flex-col border">
        <div className="w-full h-[270px] md:h-[300px] mb-3 p-4">
          <Image
            src={blog.coverPhoto}
            alt={blog.title}
            width={600}
            height={400}
            className="h-full"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h2 className="text-lg text-gray-600 font-semibold mb-5">
            {blog.title}
          </h2>
          <div className="grid grid-cols-2 gap-5 mt-auto">
            <button
              onClick={() => setIsEditBlog(true)}
              className="py-2 bg-cyan-600 hover:bg-cyan-800 transition-colors duration-300 ease-in-out text-gray-100 font-semibold"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className=" flex justify-center items-center gap-1 py-2 bg-red-500 hover:bg-red-800 transition-colors duration-300 ease-in-out text-gray-100 font-semibold"
            >
              {isLoading && <SmallSpinner />}
              Delete
            </button>
          </div>
        </div>
      </div>
      <EditBlogModal
        isEditBlog={isEditBlog}
        setIsEditBlog={setIsEditBlog}
        blog={blog}
      />
    </>
  );
};

export default SingleBlog;
