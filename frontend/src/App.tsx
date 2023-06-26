import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import BaseLayoutWrapper from "./components/baselayoutwrapper/BaseLayoutWrapper";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="app" element={<BaseLayoutWrapper />}>
        <Route path="users" element={<h1>Users</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
