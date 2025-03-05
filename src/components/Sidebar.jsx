import { Link, NavLink } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { LuArrowUpDown } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { TfiFacebook } from "react-icons/tfi";
import { RiBillFill } from "react-icons/ri";
import {TbArrowBigLeftLinesFilled} from "react-icons/tb";

const Sidebar = ({isOpen, setIsOpen}) => {
  const activeClass_md ='w-[20%] bg-white rounded-t-lg border-b-6 border-teal-70 px-3 py-2 text-teal-700 transition-all duration-300'
  const activeClass_lg =
    `${isOpen ? 'bg-white rounded  border-l-4 border-teal-700 px-5' : 'lg:mx-auto' }  text-teal-700 transition-all duration-300`;
  const LinkClass = "hover:text-white lg:px-5 transition-all duration-300  ";
  return (
    <aside
      className={`fixed z-1 flex items-center pt-3 bottom-0 w-full  bg-gray-900 text-white  transition ease-in-out duration-500 
        lg:top-0 lg:left-0 lg:h-screen lg:rounded-r-lg lg:py-6 lg:flex-col lg:w-[5%] lg:items-baseline
        ${
        isOpen ? " lg:w-[20%] lg:max-w-[250px] lg:pr-6" : "lg:min-w-[5%] "
      }`}
    >
      <Link to="/" className="hidden lg:flex">
        <h1 className="text-4xl px-4">
          {isOpen ? "Finance" : <TfiFacebook />}
        </h1>
      </Link>
      {/* Navbar contet for lg+ screens */}
      <nav className={`${isOpen ? "text-xl/12":'text-lg gap-10 mx-auto'} hidden lg:flex flex-col text-gray-300 mt-15 gap-5  h-1/2`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass_lg : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <IoMdHome />
            {isOpen && "Overview"}
          </div>
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => (isActive ? activeClass_lg : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <LuArrowUpDown />
            {isOpen && "Transactions"}
          </div>
        </NavLink>
        <NavLink
          to="/budgets"
          className={({ isActive }) => (isActive ? activeClass_lg : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <FaChartPie />
            {isOpen && "Budgets"}
          </div>
        </NavLink>
        <NavLink
          to="/pots"
          className={({ isActive }) => (isActive ? activeClass_lg : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <PiCurrencyCircleDollarFill />
            {isOpen && "Pots"}
          </div>
        </NavLink>
        <NavLink
          to="/recurringbills"
          className={({ isActive }) => (isActive ? activeClass_lg : LinkClass)}
        >
          <div className="flex items-center gap-3 ">
            <RiBillFill />
            {isOpen && "Recurring Bills"}
          </div>
        </NavLink>
      </nav>
      {/* Navbar content for sm and md screens */}
      <nav className="flex justify-around text-2xl items-baseline lg:hidden text-gray-300 w-full">
      <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass_md : LinkClass)}
        >
          <div className="flex flex-col items-center ">
            <IoMdHome />
            <p className="text-lg hidden md:block">Overview</p>
          </div>
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) => (isActive ? activeClass_md : LinkClass)}
        >
          <div className="flex flex-col items-center  ">
            <LuArrowUpDown />
            <p className="text-lg hidden md:block">Transactions</p>
          </div>
        </NavLink>
        <NavLink
          to="/budgets"
          className={({ isActive }) => (isActive ? activeClass_md : LinkClass)}
        >
          <div className="flex flex-col items-center  ">
            <FaChartPie />
            <p className="text-lg hidden md:block">Budgets</p>
          </div>
        </NavLink>
        <NavLink
          to="/pots"
          className={({ isActive }) => (isActive ? activeClass_md : LinkClass)}
        >
          <div className="flex flex-col items-center ">
            <PiCurrencyCircleDollarFill />
            <p className="text-lg hidden md:block">Pots</p>
          </div>
        </NavLink>
        <NavLink
          to="/recurringbills"
          className={({ isActive }) => (isActive ? activeClass_md : LinkClass)}
        >
          <div className="flex flex-col items-center  ">
            <RiBillFill />
            <p className="text-lg hidden md:block">recurring Bills</p>
          </div>
        </NavLink>
      </nav>

      <button className="mt-auto hidden lg:block p-6 cursor-pointer hover:text-teal-700" onClick={()=>setIsOpen(!isOpen)}>
          <div className="flex items-center gap-3">
            <TbArrowBigLeftLinesFilled
            className={`transition-transform duration-500 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`} 
            />
             {isOpen && "Minimize Menu"}
          </div>
      </button>
    </aside>
  );
};

export default Sidebar;
