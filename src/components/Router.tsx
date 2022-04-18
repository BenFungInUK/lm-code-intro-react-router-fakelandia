import { Routes, Route } from "react-router-dom";
import Confess from "./Confess";
import Home from "./Home";
import MainLayout from "./MainLayout";
import Misdemeanour from "./Misdemeanour";
import NotFound from "./NotFound";

const Router = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="misdemeanour" element={<Misdemeanour />} />
      <Route path="confess" element={<Confess />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Router;
