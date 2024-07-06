import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { useCreateProjectMutation } from "@/redux/features/projects/projectsApi";
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
  isAddProject: boolean;
  setIsAddProject: (value: boolean) => void;
};

const AddProjectModal = ({ isAddProject, setIsAddProject }: TProps) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { register, handleSubmit, reset } = useForm<TFormInput>();

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
      console.log(postData);
      const result = await createProject(postData).unwrap();
      if (result.success) {
        toast.success(result.message);
      }
      reset();
      setIsAddProject(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={`${
        !isAddProject && "hidden"
      } fixed top-0 left-0 w-full h-full overflow-y-scroll flex justify-center z-40 bg-gray-700/90 pt-10 pb-20 px-4`}
    >
      <div className="w-[1200px] h-fit rounded-md p-4 bg-[#09867E]">
        <h2 className="text-2xl font-semibold text-white mb-10 text-center">
          Add Project
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 gap-5"
        >
          <div>
            <p className="font-semibold text-white text-sm mb-2">Name</p>
            <input
              type="text"
              className="bg-white text-black p-3 w-full rounded-md overflow-hidden"
              {...register("name", { required: true })}
              placeholder="name"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">
              {" "}
              Description
            </p>
            <input
              type="text"
              className="bg-white text-black p-3 w-full rounded-md overflow-hidden"
              {...register("description", { required: true })}
              placeholder="description"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">Features </p>
            <input
              type="text"
              className="bg-white p-3 w-full rounded-md overflow-hidden"
              placeholder="features"
              {...register("features", { required: true })}
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">
              Frontend Technologies{" "}
            </p>
            <input
              type="text"
              className="bg-white p-3 w-full rounded-md overflow-hidden"
              {...register("frontendTechnologies", { required: true })}
              placeholder="frontend technologies"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">
              Backend Technologies{" "}
            </p>
            <input
              type="text"
              className="bg-white p-3 w-full rounded-md overflow-hidden"
              {...register("backendTechnologies", { required: true })}
              placeholder="backend technologies"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">Live Link</p>
            <input
              type="url"
              className="bg-white p-3 w-full rounded-md overflow-hidden"
              {...register("liveLink", { required: true })}
              placeholder="live link"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">
              Frontend Repo
            </p>
            <input
              type="url"
              className="bg-white p-3 w-full rounded-md overflow-hidden"
              {...register("frontendRepo", { required: true })}
              placeholder="frontend repository"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">
              Backend Repo
            </p>
            <input
              type="url"
              className="bg-white p-3 w-full rounded-md overflow-hidden"
              {...register("backendRepo", { required: true })}
              placeholder="backend repository"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-2">
              Image Links{" "}
            </p>
            <input
              type="text"
              className="bg-white p-3 w-full rounded-md overflow-hidden"
              {...register("imageLinks", { required: true })}
              placeholder="image links"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <button
              type="submit"
              className="font-semibold text-white bg-[#091886] rounded-md"
            >
              {isLoading && <SmallSpinner />}
              Submit
            </button>
            <button
              onClick={() => setIsAddProject(false)}
              type="button"
              className="font-semibold text-white bg-red-400 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
