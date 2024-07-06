"use client";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import LargeSpinner from "@/components/Spinner/LargeSpinner";
import AddProjectModal from "@/components/dashboard/Modal/AddProjectModal";
import { useGetProjectsQuery } from "@/redux/features/projects/projectsApi";
import SingleProject from "@/components/dashboard/SingleProject/SingleProject";

const ProjectsPage = () => {
  const [isAddProject, setIsAddProject] = useState(false);
  const { data: projectsData, error, refetch } = useGetProjectsQuery(undefined);

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
        <h2 className="text-3xl text-gray-600 ">Projects</h2>
        <button
          onClick={() => setIsAddProject(true)}
          className="flex items-center gap-1 bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out rounded-md font-semibold text-gray-100 py-1 px-5"
        >
          <FaPlus className="-mt-1" /> Add Project
        </button>
      </div>
      {!projectsData && <LargeSpinner />}
      <div className="xl:container mx-auto grid md:grid-cols-2  xl:grid-cols-3 gap-10">
        {projectsData?.data?.map((item: any, index: number) => (
          <SingleProject key={index} item={item} />
        ))}
      </div>
      <AddProjectModal
        isAddProject={isAddProject}
        setIsAddProject={setIsAddProject}
      />
    </div>
  );
};

export default ProjectsPage;
