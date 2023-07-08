import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import BaseLayoutWrapper from "./components/baselayoutwrapper/BaseLayoutWrapper";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="app" element={<BaseLayoutWrapper />}>
        <Route path="users" element={<h1>Users</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
