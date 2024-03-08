import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { SingleCrypto } from "../pages/SingleCrypto";
import { ErrorPage } from "../pages/ErrorPage";
export const AllRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cryto/:id" element={<SingleCrypto />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
