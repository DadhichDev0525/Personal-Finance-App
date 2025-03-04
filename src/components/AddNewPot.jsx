import { useDispatch } from "react-redux";
import { useState } from "react";
import DropDown from "./DropDown";
import { Themes } from "../dropdownOptions";
import { addPot, editPot } from "../store";
import { nanoid } from "@reduxjs/toolkit";

const AddNewPot = ({ onClose, isEdit, pot }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: isEdit ? pot.name : "",
    theme: isEdit ? pot.theme : "",
    targetAmount: isEdit ? pot.targetAmount : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const editedPot = { id: pot.id, balance: pot.balance, ...formData };
      dispatch(editPot({ id: pot.id, editedPot }));
    } else {
      dispatch(addPot({ id: nanoid(), balance: 0, ...formData }));
    }

    onClose()
  };
  return (
    <div>
      <p className="my-5 text-sm text-gray-500">
        {isEdit
          ? "If your saving targets change, feel free to update your pots."
          : "Create a savings pot to set aside money for your goals. Give it a name, set a target amount, and start saving towards it!"}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
        <label htmlFor="name" className="text-zinc-700 font-medium ">
          Pot Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g Rainy Days"
          id="name"
          className="w-full p-2 border rounded-md mb-2"
          autoFocus
          required
        />
        <label htmlFor="amount" className="text-zinc-700 font-medium">
          Target Amount
        </label>
        <input
          type="number"
          name="targetAmount"
          maxLength={30}
          id="amount"
          value={formData.targetAmount}
          onChange={handleChange}
          placeholder="Amount"
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

export default AddNewPot;
