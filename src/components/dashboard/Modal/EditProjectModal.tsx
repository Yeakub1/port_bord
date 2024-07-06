import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { useEditProjectMutation } from "@/redux/features/projects/projectsApi";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TFormInput = {
  name: string;
  description: string;
  features: string;
  frontendTechnologies: string;
  backendTechnologies: string;
  liveLink: string;
  frontendRepo: string;
  backendRepo: string;
  imageLinks: string;
};

type TProps = {
  isEditProject: boolean;
  setIsEditProject: (value: boolean) => void;
  item: any;
};

const EditProjectModal = ({
  isEditProject,
  setIsEditProject,
  item,
}: TProps) => {
  const [editProject, { isLoading }] = useEditProjectMutation();
  const { register, handleSubmit, setValue } = useForm<TFormInput>();

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    const features = data.features.split(/\s*,\s*/);
    const imageLinks = data.imageLinks.split(/\s*,\s*/);
    const frontendTechnologies = data.frontendTechnologies.split(/\s*,\s*/);
    const backendTechnologies = data.backendTechnologies.split(/\s*,\s*/);
    const postData = {
      ...data,
      features,
      imageLinks,
      frontendTechnologies,
      backendTechnologies,
    };

    try {
      const result = await editProject({
        projectId: item.id,
        data: postData,
      }).unwrap();
      if (result.success) {
        toast.success(result.message);
        setIsEditProject(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    setValue("name", item?.name);
    setValue("description", item?.description);
    setValue("features", item?.features?.join(", "));
    setValue("frontendTechnologies", item?.frontendTechnologies?.join(", "));
    setValue("backendTechnologies", item?.backendTechnologies?.join(", "));
    setValue("liveLink", item?.liveLink);
    setValue("frontendRepo", item?.frontendRepo);
    setValue("backendRepo", item?.backendRepo);
    setValue("imageLinks", item?.imageLinks?.join(", "));
  }, [item, setValue]);

  return (
    <div
      className={`${
        !isEditProject && "hidden"
      } fixed top-0 left-0 w-full h-full overflow-y-scroll flex justify-center z-40 bg-gray-700/90 pt-10 pb-20 px-4`}
    >
      <div className="w-[700px] h-fit rounded-md p-4 bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-10">
          Edit Project
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">Name</p>
            <input
              type="text"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("name", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Description
            </p>
            <textarea
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("description", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Features{" "}
              <span className="text-cyan-600 font-medium">
                (separated by comma)
              </span>
            </p>
            <input
              type="text"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("features", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Frontend Technologies{" "}
              <span className="text-cyan-600 font-medium">
                (separated by comma)
              </span>
            </p>
            <input
              type="text"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("frontendTechnologies", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Backend Technologies{" "}
              <span className="text-cyan-600 font-medium">
                (separated by comma)
              </span>
            </p>
            <input
              type="text"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("backendTechnologies", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Live Link
            </p>
            <input
              type="url"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("liveLink", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Frontend Repo
            </p>
            <input
              type="url"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("frontendRepo", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Backend Repo
            </p>
            <input
              type="url"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("backendRepo", { required: true })}
            />
          </div>
          <div className="mb-5">
            <p className="font-semibold text-gray-600 text-sm mb-2">
              Image Links{" "}
              <span className="text-cyan-600 font-medium">
                (separated by comma)
              </span>
            </p>
            <input
              type="text"
              className="bg-gray-100 border-2 border-gray-300 p-3 w-full rounded-md overflow-hidden"
              {...register("imageLinks", { required: true })}
            />
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <button
              type="submit"
              className="flex justify-center items-center gap-1 bg-cyan-600 text-gray-100 font-semibold hover:bg-cyan-700 transition-all duration-300 ease-in-out p-3 rounded-md"
            >
              {isLoading && <SmallSpinner />}
              Submit
            </button>
            <button
              onClick={() => setIsEditProject(false)}
              type="button"
              className="bg-red-500 text-gray-100 font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out p-3 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;