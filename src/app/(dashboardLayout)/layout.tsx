import DashboardDrawer from "@/components/dashboard/DashboardDrawer/DashboardDrawer";
import Link from "next/link";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default layout;
