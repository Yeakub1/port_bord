import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { config } from "@/constants/editor-config";
import { useEditBlogMutation } from "@/redux/features/blogs/blogsApi";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TFormInput = {
  title: string;
  category: string;
  coverPhoto: string;
  content: string;
};

type TProps = {
  isEditBlog: boolean;
  setIsEditBlog: (value: boolean) => void;
  blog: any;
};

const EditBlogModal = ({ isEditBlog, setIsEditBlog, blog }: TProps) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [editBlog, { isLoading }] = useEditBlogMutation();
  const { register, handleSubmit, setValue } = useForm<TFormInput>();

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    try {
      const postData = {
        ...data,
        content,
      };

      const result = await editBlog({
        blogId: blog.id,
        data: postData,
      }).unwrap();
      if (result.success) {
        toast.success(result.message);
        setIsEditBlog(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    setValue("title", blog?.title);
    setValue("category", blog?.category);
    setValue("coverPhoto", blog?.coverPhoto);
    setContent(blog?.content);
  }, [blog, setValue]);

  return (
    <div
      className={`${
        !isEditBlog && "hidden"
      } fixed top-0 left-0 w-full h-full overflow-y-scroll flex justify-center z-40 bg-gray-700/90 pt-10 pb-20 px-4`}
    >
      <div className="w-[1000px] h-fit rounded-md p-4 bg-[#09867E] text-white">
        <h2 className="text-2xl text-center font-semibold  mb-10">Edit Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-5">
            <label className="font-medium mb-1">Title</label>
            <input
              type="text"
              className="input input-bordered rounded-sm text-gray-600 bg-gray-50"
              {...register("title", { required: true })}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="font-medium mb-1">Cover Photo</label>
            <input
              type="text"
              className="input input-bordered rounded-sm text-gray-600 bg-gray-50"
              {...register("coverPhoto", { required: true })}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className=" font-medium mb-1">Category</label>
            <input
              type="text"
              className="input input-bordered rounded-sm text-gray-600 bg-gray-50"
              {...register("category", { required: true })}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className=" font-medium mb-1">Content</label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <button
              type="submit"
              className="bg-[#091886] font-semibold p-2 rounded-md"
            >
              {isLoading && <SmallSpinner />}
              Submit
            </button>
            <button
              onClick={() => setIsEditBlog(false)}
              type="button"
              className="bg-red-400 font-semibold p-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogModal;
