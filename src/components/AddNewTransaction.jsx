import DropDown from "./DropDown";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTransaction } from "../store";
import { useState } from "react";
import { Categories } from "../dropdownOptions";


const AddNewTransaction = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new transaction object
    const newTransaction = {
      id: nanoid(),
      ...formData
    };

    dispatch(addTransaction(newTransaction));

    onClose();
  };

  return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
          <label htmlFor="name" className="text-zinc-700 font-medium ">
            Transaction Name
          </label>
          <input
            type="text"
            name="name"
            maxLength={30}
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g Darlinn Service Hub"
            id="name"
            className="w-full p-2 border rounded-md mb-2"
            autoFocus
            required
          />
          <label htmlFor="date" className="text-zinc-700 font-medium">
            Transaction Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
            required
          />
          <DropDown
            selected={formData.category}
            setSelected={handleChange}
            Options={Categories}
            label = 'Category'
          />
          <label htmlFor="amount" className="text-zinc-700 font-medium">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full p-2 border rounded-md mb-2"
            required
          />

          {/* Submit Button */}
          <button className="w-full bg-black text-white p-2 rounded-md">
            Submit
          </button>
        </form>
  );
};

export default AddNewTransaction;
