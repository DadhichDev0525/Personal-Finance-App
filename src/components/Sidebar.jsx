import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { LuArrowUpDown } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { TfiFacebook } from "react-icons/tfi";
import { RiBillFill } from "react-icons/ri";
import {
  TbArrowBigLeftLinesFilled,
  TbArrowBigRightLinesFilled,
} from "react-icons/tb";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const activeClass =
    `${isOpen ? 'bg-white rounded  border-l-4 border-teal-700 px-5' : 'mx-auto' } text-teal-700 transition-all duration-500`;
  const LinkClass = "hover:text-white px-5 transition-all duration-500 ";
  return (
    <aside
      className={`flex flex-col bg-gray-900 text-white min-h-screen py-6 rounded-r-lg transition-all  duration-500 ${
        isOpen ? "w-[20%] pr-6" : "min-w-[5%] "
      }`}
    >
      <Link to="/">
        <h1 className="text-4xl px-4">
          {isOpen ? "Finance" : <TfiFacebook />}
        </h1>
      </Link>
      <nav className={`${isOpen ? "text-xl/12":'text-lg gap-10 mx-auto'} flex flex-col text-gray-300 mt-15 gap-5  h-1/2`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <IoMdHome />
            {isOpen && "Overview"}
          </div>
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => (isActive ? activeClass : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <LuArrowUpDown />
            {isOpen && "Transactions"}
          </div>
        </NavLink>
        <NavLink
          to="/budget"
          className={({ isActive }) => (isActive ? activeClass : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <FaChartPie />
            {isOpen && "Budgets"}
          </div>
        </NavLink>
        <NavLink
          to="/pots"
          className={({ isActive }) => (isActive ? activeClass : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <PiCurrencyCircleDollarFill />
            {isOpen && "Pots"}
          </div>
        </NavLink>
        <NavLink
          to="/recurringbills"
          className={({ isActive }) => (isActive ? activeClass : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <RiBillFill />
            {isOpen && "Recurring Bills"}
          </div>
        </NavLink>
      </nav>
      <button className="mt-auto p-6 cursor-pointer hover:text-teal-700" onClick={()=>setIsOpen(!isOpen)}>
        {isOpen ? (
          <div className="flex items-center gap-3">
            <TbArrowBigLeftLinesFilled />
            Minimize Menu
          </div>
        ) : (
          <TbArrowBigRightLinesFilled />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
