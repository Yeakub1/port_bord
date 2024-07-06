"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "@/services/actions/loginUser";
import { authKey } from "@/constants/auth-key";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data:any) => {
    setLoading(true);
    try {
      const userInfo: any = await loginUser(data);
      console.log(userInfo);

      if (userInfo.success) {
        toast.success(userInfo.message);
        localStorage.setItem(authKey, JSON.stringify(userInfo.data.token));
      }
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };
  return (
    <div className="bg-blue-gray-900 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
      <div className="bg-white lg:w-6/12 md:7/12 w-10/12 shadow-3xl rounded-xl">
        <div className="mt-6">
          <h1 className="text-2xl flex items-center justify-center gap-3">
            Login to{" "}
            <span className="font-semibold text-3xl">Portfolio Dashoboard</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-12 md:p-24">
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 absolute ml-3"
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>

            <input
              {...register("email")}
              type="email"
              id="email"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Email"
            />
          </div>
          <div className="flex items-center text-lg mb-6 md:mb-8">
            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
              <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
            </svg>

            <input
              {...register("password")}
              type="password"
              id="password"
              className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
              placeholder="Password"
            />
          </div>
          <button className="bg-[#09867E] font-medium p-2 md:p-4 text-white uppercase w-full rounded">
            {loading && (
              <span className=" animate-spin w-5 h-5 border-l-2 border-t-2 -mt-1 inline-block rounded-full"></span>
            )}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
