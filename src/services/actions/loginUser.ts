"use server";

import { authKey } from "@/constants/auth-key";
import { cookies } from "next/headers";

export const loginUser = async (data: any) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  const userInfo = await res.json();
  if (userInfo) {
    cookies().set(authKey, userInfo.data.token);
  }

  return userInfo;
};
