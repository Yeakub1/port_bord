"use client";
import LargeSpinner from "@/components/Spinner/LargeSpinner";
import SmallSpinner from "@/components/Spinner/SmallSpinner";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/user/userApi";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type TProfile = {
  name: string;
  age: string;
  description: string;
  designation: string;
  userPhoto: string;
  contactNumber: string;
  facebookLink: string;
  githubLink: string;
  linkedinLink: string;
  location: string;
};

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateUserProfile, { isLoading: updateLoading }] =
    useUpdateUserProfileMutation();
  const { data: userData, isLoading: profileLoading } =
    useGetUserProfileQuery(undefined);
  const profile = userData?.data?.UserProfile;

  const { register, handleSubmit, setValue } = useForm<TProfile>();

  const onSubmit: SubmitHandler<TProfile> = async (data) => {
    try {
      const result = await updateUserProfile(data).unwrap();
      if (result.success) {
        toast.success(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  useEffect(() => {
    setValue("name", profile?.name);
    setValue("age", profile?.age);
    setValue("description", profile?.description);
    setValue("designation", profile?.designation);
    setValue("userPhoto", profile?.userPhoto);
    setValue("contactNumber", profile?.contactNumber);
    setValue("facebookLink", profile?.facebookLink);
    setValue("githubLink", profile?.githubLink);
    setValue("linkedinLink", profile?.linkedinLink);
    setValue("location", profile?.location);
  }, [profile, setValue]);

  return (
    <div className="px-4 pb-[100px]">
      <h2 className="text-3xl text-gray-600 pt-5 pb-10">Profile</h2>
      <div className="xl:container mx-auto">
        <div className={`${isEditing && "hidden"}`}>
          {profileLoading && <LargeSpinner />}
          {userData && (
            <>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                Name: <span className="font-normal ml-2">{profile?.name}</span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                Age: <span className="font-normal ml-2">{profile?.age}</span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold whitespace-pre-wrap">
                Description:{" "}
                <span className="font-normal ml-2">{profile?.description}</span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                Designation:{" "}
                <span className="font-normal ml-2">{profile?.designation}</span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                Photo:{" "}
                <span className="font-normal ml-2">{profile?.userPhoto}</span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                Contact number:{" "}
                <span className="font-normal ml-2">
                  {profile?.contactNumber}
                </span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                Facebook link:{" "}
                <span className="font-normal ml-2">
                  {profile?.facebookLink}
                </span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                Github link:{" "}
                <span className="font-normal ml-2">{profile?.githubLink}</span>
              </p>
              <p className="text-gray-700 text-xl mb-3 font-semibold">
                LinkedIn link:{" "}
                <span className="font-normal ml-2">
                  {profile?.linkedinLink}
                </span>
              </p>
              <p className="text-gray-700 text-xl mb-10 font-semibold">
                Location:{" "}
                <span className="font-normal ml-2">{profile?.location}</span>
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-teal-600 hover:bg-teal-800 transition-all duration-300 ease-in-out rounded-md font-semibold text-gray-100 py-2 w-[200px]"
              >
                Edit
              </button>
            </>
          )}
        </div>

        {/* Form */}
        <form
          className={`max-w-[800px] pb-[100px] ${!isEditing && "hidden"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label>Name</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("age", { required: true })}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              {...register("description", { required: true })}
              rows={10}
            />
          </div>
          <div>
            <label>Designation</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("designation", { required: true })}
            />
          </div>
          <div>
            <label>User Photo</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("userPhoto", { required: true })}
            />
          </div>
          <div>
            <label>Contact Number</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("contactNumber", { required: true })}
            />
          </div>
          <div>
            <label>Facebook Link</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("facebookLink", { required: true })}
            />
          </div>
          <div>
            <label>Github Link</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("githubLink", { required: true })}
            />
          </div>
          <div>
            <label>LinkedIn Link</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("linkedinLink", { required: true })}
            />
          </div>
          <div>
            <label>Location</label>
            <input
              className="border bg-gray-100 text-gray-700 w-full block py-2 px-2 mb-5 shadow-sm"
              type="text"
              {...register("location", { required: true })}
            />
          </div>
          <div className="flex items-center gap-5">
            <button
              className="flex justify-center items-center gap-1 bg-teal-600 hover:bg-teal-800 transition-all duration-300 ease-in-out rounded-md font-semibold text-gray-100 py-2 w-[150px]"
              type="submit"
            >
              {updateLoading && <SmallSpinner />}
              Submit
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-600 hover:bg-red-800 transition-all duration-300 ease-in-out rounded-md font-semibold text-gray-100 py-2 w-[150px]"
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
