import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="allContent">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
