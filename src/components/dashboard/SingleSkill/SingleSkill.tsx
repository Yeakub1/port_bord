import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { useDeleteSkillMutation } from "@/redux/features/skills/skillsApi";
import { useState } from "react";
import { toast } from "sonner";
import EditSkillModal from "../Modal/EditSkillModal";

type SingleSkillType = {
  item: any;
  index: number;
};

const SingleSkill = ({ item, index }: SingleSkillType) => {
  const [isEditSkill, setIsEditSkill] = useState(false);
  const [deleteSkill, { isLoading: deleteLoading }] = useDeleteSkillMutation();

  const handleDelete = async () => {
    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!deleteConfirmation) {
      return;
    }

    try {
      const result = await deleteSkill(item.id).unwrap();
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        key={item.id}
        className="grid sm:grid-cols-3 gap-3 bg-gray-200/50 py-2 px-4 rounded-md mb-3 font-medium text-gray-700"
      >
        <p>
          <span className="text-cyan-700">{index + 1}.</span> {item.name}
        </p>
        <div className="sm:text-center">
          <p className="text-cyan-700">{item.proficiency}</p>
        </div>
        <div className="flex sm:justify-end gap-3">
          <button
            onClick={() => setIsEditSkill(true)}
            className="flex justify-center items-center text-sm font-semibold text-gray-100 bg-cyan-600 hover:bg-cyan-800 transition-all duration-300 ease-in-out py-1 w-[120px] rounded-md"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex justify-center items-center text-sm font-semibold text-gray-100 bg-red-500 hover:bg-red-700 transition-all duration-300 ease-in-out py-1 w-[120px] rounded-md"
          >
            {deleteLoading && <SmallSpinner />}
            Delete
          </button>
        </div>
      </div>
      <EditSkillModal
        isEditSkill={isEditSkill}
        setIsEditSkill={setIsEditSkill}
        skill={item}
      />
    </>
  );
};

export default SingleSkill;
