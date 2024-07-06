"use client";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/services/auth.services";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { dashboardLinks } from "./DashboardData";

type TUserInfo = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

const DashboardDrawer = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<TUserInfo>();
  const pathname = usePathname();
  const router = useRouter();

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleLogout = () => {
    logoutUser(router);
    removeUser();
  };

  useEffect(() => {
    const user = getUserInfo();
    if (user) {
      setUserInfo(user as any);
    }
  }, []);

  return (
    <>
      <div className="flex fixed top-0 left-0 h-screen w-full">
        <div className="hidden bg-[#09867E] py-5 px-4 w-[300px] h-screen z-10 lg:flex flex-col">
          <h2 className="text-3xl mb-5 font-semibold text-center text-white">
            Yeakub
          </h2>
          <ul className="flex-1 w-full mt-1 rounded-sm py-5 px-3 flex flex-col gap-3 text-white">
            {dashboardLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={`${
                    pathname === item.route
                      ? "bg-[#09867E] text-orange-500"
                      : "bg-[#09867E] text-white"
                  } hover:bg-[#09867E] transition-all duration-300 ease-in-out rounded-sm text-gray-950 py-3 text-center text-base font-semibold`}
                  href={item.route}
                >
                  {item.name}
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center px-4 bg-[#09867E] h-[80px] w-full border-l-2 border-[#09867E]">
            <button onClick={openSidebar} className="lg:hidden text-3xl ">
              <IoMenu />
            </button>

            <div className="">
              <button
                onClick={handleLogout}
                className="py-2 bg-red-500 font-bold px-4 rounded-full text-white"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="bg-gray-50 flex-1 overflow-y-scroll">{children}</div>
        </div>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 bg-[#09867E] py-5 px-4 w-[300px] h-screen flex lg:hidden flex-col ${
          isSidebarOpen
            ? "translate-x-0 shadow-2xl shadow-cyan-500/30"
            : "-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-center text-white">
            Yeakub
          </h2>
          <button
            onClick={closeSidebar}
            className="text-white rotate-90 rounded-full"
          >
            <FaX />
          </button>
        </div>
        <ul className="flex-1 w-full bg-[#09867E] mt-1 rounded-sm py-5 px-3 flex flex-col gap-3">
          {dashboardLinks.map((item, index) => {
            return (
              <Link
                key={index}
                onClick={closeSidebar}
                className={`${
                  pathname === item.route ? "bg-[#09867E]" : "bg-[#09867E]"
                } hover:bg-cyan-200 transition-all duration-300 ease-in-out rounded-sm text-white py-3 text-center text-base font-semibold`}
                href={item.route}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DashboardDrawer;
