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
    recurring: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "date") {
      let formattedValue = value;

      if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        console.log('formating')
        const [month, day, year] = value.split("/");
        if (!year || year.length > 4) return;
        formattedValue = `${year}-${month}-${day}`;
      }
      const isValid =
        /^\d{4}-\d{2}-\d{2}$/.test(value) &&
        !isNaN(new Date(formattedValue).getTime());
      if (isValid) {
        setFormData((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));
      }
    }else if (type === "number") {
      // Remove non-numeric characters
      let newValue = value.replace(/[^\d-]/g, "");
      newValue = newValue.replace(/(?!^)-/g, "");
  
      // Limit to 9 digits
      if (newValue.length > 9) {
        newValue = newValue.slice(0, 9);
      }
  
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(formData.amount);

    // Create new transaction object
    const newTransaction = {
      id: nanoid(),
      ...formData,
      recurring: amount >= 0 ? false : formData.recurring,
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
        min={new Date().toISOString().split("T")[0]} 
        max = '2099-12-31'
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
        required
      />
      <DropDown
        selected={formData.category}
        setSelected={handleChange}
        Options={Categories}
        label="Category"
      />
      <label htmlFor="amount" className="text-zinc-700 font-medium">
        Amount
      </label>
      <input
        type="number"
        name="amount"
        id="amount"
        max={999999999}
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="w-full p-2 border rounded-md mb-2"
        required
      />
      <div className="space-x-5 px-1">
        <input
          type="checkbox"
          name="recurring"
          id="recurring"
          value={formData.recurring}
          onChange={handleChange}
          className="w-3 h-3"
        />
        <label htmlFor="recurring" className="text-zinc-700 font-medium">
          Recurring
        </label>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-black text-white p-2 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default AddNewTransaction;
