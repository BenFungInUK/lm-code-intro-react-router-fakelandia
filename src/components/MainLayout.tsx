import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./MainLayout.css";

const MainLayout: React.FC = () => (
  <div className="mainContainer">
    <Header />
    <main className="mainContiner__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
