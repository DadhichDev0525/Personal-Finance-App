import { useDispatch } from "react-redux";
import { useState } from "react";
import DropDown from "./DropDown";
import { Themes,Categories } from "../dropdownOptions";
import { addBudget, editBudget } from "../store";
import { nanoid } from "@reduxjs/toolkit";

const AddNewBudget = ({ onClose, isEdit, budget }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category: isEdit ? budget.category : "",
    theme: isEdit ? budget.theme : "",
    maxSpend: isEdit ? budget.maxSpend : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const editedBudget = { id: budget.id,spent:budget.spent, ...formData };
      dispatch(editBudget({ id: budget.id, editedBudget }));
    } else {
      dispatch(addBudget({ id: nanoid(), spent: 0, ...formData }));
    }
    onClose()
  };
  return (
    <div>
      <p className="my-5 text-sm text-gray-500">
        {isEdit
          ? "As your budgets change, feel free to update your spending limits."
          : "Choose a category to set a spending budget. These categories can help you monitor spending."}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
        <DropDown  
        selected={formData.category}
        setSelected={handleChange}
        Options={Categories}
        label="Category"
        />
        <label htmlFor="amount" className="text-zinc-700 font-medium">
          Maximum Spend
        </label>
        <input
          type="number"
          name="maxSpend"
          maxLength={30}
          id="amount"
          value={formData.maxSpend}
          onChange={handleChange}
          placeholder="e.g $2000"
          className="w-full p-2 border rounded-md mb-2"
          required
        />
        <DropDown
          selected={formData.theme}
          setSelected={handleChange}
          Options={Themes}
          label="Theme"
        />

        {/* Submit Button */}
        <button className="w-full bg-black text-white p-2 rounded-md">
          {isEdit ? 'Save' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddNewBudget;
