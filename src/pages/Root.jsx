import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Root = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-start">
     <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
     <div className={`min-w-[375px] mb-3 md:mb-10 lg:mb-0 w-full ${isOpen ? 'lg:ml-[20%]':'lg:ml-[5%]'}`}>
     <Outlet />
     </div>
    </div>
  )
}

export default Root