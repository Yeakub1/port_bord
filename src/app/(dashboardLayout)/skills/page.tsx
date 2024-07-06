"use client";
import LargeSpinner from "@/components/Spinner/LargeSpinner";
import AddSkillModal from "@/components/dashboard/Modal/AddSkillModal";
import SingleSkill from "@/components/dashboard/SingleSkill/SingleSkill";
import { useGetSkillsQuery } from "@/redux/features/skills/skillsApi";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

const SkillsPage = () => {
  const [isAddSkill, setIsAddSkill] = useState(false);
  const {
    data: skillsData,
    isLoading: dataLoading,
    error,
    refetch,
  } = useGetSkillsQuery(undefined);

  useEffect(() => {
    if (error) {
      const retryTimeout = setTimeout(() => {
        refetch();
      }, 2000);

      return () => clearTimeout(retryTimeout);
    }
  }, [error, refetch]);

  return (
    <div className="px-4 pb-[100px]">
      <div className="flex justify-between items-center pt-5 pb-10">
        <h2 className="text-3xl text-gray-600 ">Skills</h2>
        <button
          onClick={() => setIsAddSkill(true)}
          className="flex items-center gap-1 bg-[#09867E] rounded-md font-semibold text-gray-100 py-1 px-5"
        >
          <FaPlus className="-mt-1" /> Add Skill
        </button>
      </div>
      {!skillsData && <LargeSpinner />}
      <div className="xl:container mx-auto">
        {skillsData?.data?.map((item: any, index: number) => (
          <SingleSkill key={item.id} item={item} index={index} />
        ))}
      </div>
      <AddSkillModal isAddSkill={isAddSkill} setIsAddSkill={setIsAddSkill} />
    </div>
  );
};

export default SkillsPage;
