import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import "./layout.css";
import Navbar from "../../../components/Navbar";
const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
