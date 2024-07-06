import { dashboardLinks } from "@/components/dashboard/DashboardDrawer/DashboardData";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="xl:container px-4 pt-5 pb-[100px]">
      <h2 className="text-center text-3xl mb-7 text-[#09867E] font-bold">
        Portfolio Management Dashboard
      </h2>
      <div className="grid lg:grid-cols-3 gap-5 mt-10">
        {dashboardLinks.map((item, index) => {
          if (item.route === "/") {
            return;
          }
          return (
            <Link
              key={index}
              className="bg-[#09867E] py-20 text-center text-white rounded text-2xl font-medium"
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
