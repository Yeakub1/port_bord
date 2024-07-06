import { authKey } from "@/constants/auth-key";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/utils/local-storage";
import { jwtDecode } from "jwt-decode";

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);

  if (authToken) {
    const decodedInfo = jwtDecode(authToken);
    const userInfo = { ...decodedInfo };

    return userInfo;
  } else {
    return "";
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};
