import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const BaseLayoutWrapper = () => {
  const [userData, setUserData] = useState<any>({
    status: "loading",
    error: null,
    data: {},
  });

  const { status, error, data } = userData;

  useEffect(() => {
    const getUserData = async () => {
      const response = await axiosInstance.get("/api/users/one");
      if (response?.status === 200) {
        setUserData({
          status: "success",
          error: null,
          data: response?.data,
        });
      } else
        setUserData({
          status: "fail",
          error: response,
          data: {},
        });
    };

    getUserData();
  }, []);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  if (status === "fail") {
    return <h1>Error</h1>;
  }

  return <Outlet />;
};

export default BaseLayoutWrapper;
