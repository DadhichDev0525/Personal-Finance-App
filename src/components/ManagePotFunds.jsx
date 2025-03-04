import { useState } from "react";
import { useDispatch } from "react-redux";
import { editPot } from "../store";
const ManagePotFunds = ({ pot, onClose, mode }) => {
  const dispatch = useDispatch();
  const isAdding = mode === "add";
  const [amount, setAmount] = useState(0);

  const maxAllowed = isAdding ? pot.targetAmount - pot.balance : pot.balance;
  const newBalance = isAdding ? pot.balance + amount : pot.balance - amount;
  const balancePercentage = (newBalance / pot.targetAmount) * 100;

  const handleChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setAmount("");
      return;
    }
    value = Number(value)
    if (value > maxAllowed) {
      value = maxAllowed;
    }
    setAmount(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const editedPot = { ...pot, balance: newBalance };
    dispatch(editPot({ id: pot.id, editedPot }));
    onClose();
  };
  return (
    <div>
      <p className="my-5 text-sm text-gray-500">
        {isAdding
          ? "Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance"
          : "Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot."}
      </p>
      <div className="flex justify-between items-center mt-10">
        <p className="text-sm text-gray-500 font-medium">New Amount</p>
        <p className="font-bold text-gray-800 text-3xl">
           { newBalance.toFixed(2)}
        </p>
      </div>
      <div className="w-full bg-gray-500 h-2 rounded mt-5">
        <div
          className="h-full max-w-full rounded bg-teal-700"
          style={{ width: `${balancePercentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        <p className={`text-sm ${isAdding ? 'text-green-500':'text-red-500'}`}>
          {balancePercentage.toFixed(2)}%
        </p>
        <p className="text-sm text-gray-500">Target of ${pot.targetAmount}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="amount" className="text-zinc-700 font-medium">
          {isAdding ? 'Amount to Add' : 'Amount to Withdraw'}
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          min={0}
          max={maxAllowed}
          placeholder="Enter Amount"
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-2"
          autoFocus
          required
        />
        <button className="w-full bg-black text-white p-2 rounded-md">
          {isAdding ? 'Confirm Addition':'Confirm Withdrawal'}
        </button>
      </form>
    </div>
  );
};

export default ManagePotFunds;
