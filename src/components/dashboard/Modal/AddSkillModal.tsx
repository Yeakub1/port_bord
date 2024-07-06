import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { useCreateSkillMutation } from "@/redux/features/skills/skillsApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TFormInput = {
  name: string;
  proficiency: string;
};

type TProps = {
  isAddSkill: boolean;
  setIsAddSkill: (value: boolean) => void;
};

const AddSkillModal = ({ isAddSkill, setIsAddSkill }: TProps) => {
  const [createSkill, { isLoading }] = useCreateSkillMutation();
  const { register, handleSubmit, reset } = useForm<TFormInput>();

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    try {
      const result = await createSkill(data).unwrap();
      if (result.success) {
        toast.success(result.message);
      }
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div
      className={`${
        !isAddSkill && "hidden"
      } fixed top-0 left-0 w-full flex justify-center items-center min-h-screen z-40 bg-gray-700/80 py-10 px-4`}
    >
      <div className="w-[400px] min-h-[500px] rounded-md overflow-hidden p-4 bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-700 mb-10">
          Add Skill
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="input input-bordered border-gray-400 w-full bg-gray-100 text-gray-700 mb-5"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <input
            className="input input-bordered border-gray-400 w-full bg-gray-100 text-gray-700 mb-5"
            type="text"
            placeholder="Proficiency"
            {...register("proficiency", { required: true })}
          />
          <button
            className="flex items-center justify-center gap-1 bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out text-gray-100 font-semibold w-full py-3 rounded-md mb-3"
            type="submit"
          >
            {isLoading && <SmallSpinner />}
            Add
          </button>
          <button
            onClick={() => setIsAddSkill(false)}
            className="bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out text-gray-100 font-semibold w-full py-3 rounded-md "
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSkillModal;
