import { Outlet, Route, Routes } from "react-router-dom";
import axios from "axios";
import SignUp from "./pages/signup/SignUp";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // if (error?.response?.status === 401) {

    // }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="app" element={<Outlet />}>
        <Route path="users" element={<h1>Users</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
