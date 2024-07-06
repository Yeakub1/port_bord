"use server";

import { cookies } from "next/headers";

export const deleteCookie = (key: string) => {
  return cookies().delete(key);
};
