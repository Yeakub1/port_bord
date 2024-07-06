import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { useEditSkillMutation } from "@/redux/features/skills/skillsApi";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TFormInput = {
  name: string;
};

type TProps = {
  isEditSkill: boolean;
  setIsEditSkill: (value: boolean) => void;
  skill: any;
};

const EditSkillModal = ({ isEditSkill, setIsEditSkill, skill }: TProps) => {
  const [editSkill, { isLoading }] = useEditSkillMutation();
  const { register, handleSubmit, setValue } = useForm<TFormInput>();

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    try {
      const result = await editSkill({
        skillId: skill.id,
        data,
      }).unwrap();
      if (result.success) {
        toast.success(result.message);
        setIsEditSkill(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    setValue("name", skill?.name)
  }, [skill, setValue]);

  return (
    <div
      className={`${
        !isEditSkill && "hidden"
      } fixed top-0 left-0 w-full h-full overflow-y-scroll flex items-center justify-center z-40 bg-gray-700/90 pt-10 pb-20 px-4`}
    >
      <div className="w-[500px] h-fit rounded-md p-4 bg-[#09867E] text-white">
        <h2 className="text-2xl text-center font-semibold text-white mb-10">
          Edit Skill
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col mb-5">
            <label className="text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              className="input input-bordered rounded-md text-gray-600 bg-gray-50"
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <button
              type="submit"
              className="flex justify-center items-center gap-1 bg-[#091886] p-3 rounded-md"
            >
              {isLoading && <SmallSpinner />}
              Submit
            </button>
            <button
              onClick={() => setIsEditSkill(false)}
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

export default EditSkillModal;
