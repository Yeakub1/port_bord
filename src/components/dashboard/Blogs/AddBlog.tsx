import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { config } from "@/constants/editor-config";
import { useCreateBlogMutation } from "@/redux/features/blogs/blogsApi";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TFormInput = {
  title: string;
  category: string;
  coverPhoto: string;
  content: string;
};

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [createBlog, { isLoading }] = useCreateBlogMutation();
  const { register, handleSubmit, reset } = useForm<TFormInput>();

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    try {
      const newBlogData = { ...data, content };

      const result = await createBlog(newBlogData).unwrap();
      if (result.success) {
        toast.success(result.message);
        reset();
        setContent("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#09867E] text-white p-4">
      <h2 className="text-2xl text-center font-bold mb-10">Add Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label className=" font-medium mb-1">Title</label>
          <input
            type="text"
            className="input input-bordered rounded-sm text-black bg-gray-50"
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label className=" font-medium mb-1">Cover Photo</label>
          <input
            type="text"
            className="input input-bordered rounded-sm text-black bg-gray-50"
            {...register("coverPhoto", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label className=" font-medium mb-1">Category</label>
          <input
            type="text"
            className="input input-bordered rounded-sm text-black bg-gray-50"
            {...register("category", { required: true })}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label className=" font-medium mb-1">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            className="text-black"
            onChange={(newContent) => setContent(newContent)}
          />
        </div>
        <button
          className="flex items-center justify-center w-full mt-3 py-2 font-semibold bg-[#091886] rounded-md text-gray-100"
          type="submit"
        >
          {isLoading && <SmallSpinner />}
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
