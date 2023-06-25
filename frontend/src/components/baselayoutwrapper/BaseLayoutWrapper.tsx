import { Route } from "react-router-dom";

const BaseLayoutWrapper = () => {
  return (
    <>
      <Route path="users" element={<h1>Users</h1>} />
    </>
  );
};

export default BaseLayoutWrapper;
