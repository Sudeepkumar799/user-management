import { UsersModel } from "./../models/UserModels";
import axiosInstance from "../utils/axiosInstance";

export const fetchUsersList = async (): Promise<UsersModel> => {
  const response = await axiosInstance.get(
    "http://localhost:4000/api/users/all"
  );
  return response.data;
};
