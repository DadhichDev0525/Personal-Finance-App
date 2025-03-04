import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="flex ">
     <Sidebar />
     <Outlet />
    </div>
  )
}

export default Root