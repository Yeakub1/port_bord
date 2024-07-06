import { dashboardLinks } from "@/components/dashboard/DashboardDrawer/DashboardData";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="xl:container px-4 pt-5 pb-[100px]">
      <h2 className="text-2xl text-cyan-950 mb-10">
        Welcome to your Dashboard!
      </h2>
      <h2 className="text-cyan-900 text-3xl bg-cyan-100 py-3 px-4 rounded-sm mb-7">
        Your Services
      </h2>
      <div className="grid lg:grid-cols-2 gap-5">
        {dashboardLinks.map((item, index) => {
          if (item.route === "/") {
            return;
          }
          return (
            <Link
              key={index}
              className="bg-cyan-950 hover:bg-cyan-800 transition-all duration-300 ease-in-out py-6 text-center text-violet-100 rounded text-xl font-medium"
              href={item.route}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
