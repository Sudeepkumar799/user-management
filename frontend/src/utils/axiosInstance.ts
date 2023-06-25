import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

/**
 * Catch the AunAuthorized Request
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = "/auth/login";
    }
  }
);

export default instance;
