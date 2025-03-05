import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoCaretForwardOutline } from "react-icons/io5";
import { deleteBudget,editBudget } from "../store";
import AddNewBudget from "./AddNewBudget";
import Modal from "./Modal";
import Panel from "./Panel";

const BudgetCard = ({ budget }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(state=>state.transactions)
  const filteredTransaction = transactions.filter(tx=> tx.category === budget.category)
  const [isEdit, setIsEdit] = useState(false);
  const color = budget.theme.toLowerCase();
  const spendPercentage = (Math.abs(budget.spent) / budget.maxSpend) * 100;
  const totalSpent = filteredTransaction.reduce((acc,tx)=> acc + Number(tx.amount),0)
  const freeAmount = budget.maxSpend - Math.abs(totalSpent)

  useEffect(()=>{
    const id = budget.id
    const editedBudget = {...budget,spent:totalSpent}
    dispatch(editBudget({id,editedBudget}))
  },[transactions])

  const handleDelete = (id) => {
    dispatch(deleteBudget(id));
  };

  return (
    <Panel className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="font-bold text-lg">{budget.category}</h3>
        </div>
        <div className="cursor-pointer flex gap-2 text-xl">
          <CiEdit onClick={() => setIsEdit(true)} />
          <MdDeleteOutline onClick={() => handleDelete(budget.id)} />
          {isEdit && (
            <Modal onClose={() => setIsEdit(false)} heading="Edit Budget">
              <AddNewBudget
                onClose={() => setIsEdit(false)}
                isEdit={isEdit}
                budget={budget}
              />
            </Modal>
          )}
        </div>
      </div>
      <p className="my-5 text-sm text-gray-500">
        Maximum of ${budget.maxSpend}
      </p>
      <div className=" bg-orange-100 h-5 rounded-md mt-5">
        <div
          className="h-full rounded-md"
          style={{
            backgroundColor: color,
            width: `${spendPercentage}%`,
          }}
        />
      </div>
      <div className="flex justify-between  my-5">
        <div
          className="flex flex-col w-1/2 border-l-4 px-3 py-1 rounded-xs"
          style={{
            borderColor: color,
          }}
        >
          <p className=" text-sm text-gray-700">Spent</p>
          <p className="font-medium">{budget.spent >= 0 ? `$${budget.spent.toFixed(2)}`:`-$${Math.abs(budget.spent).toFixed(2)}`}</p>
        </div>
        <div className="flex flex-col w-1/2 border-l-4 px-3 py-1 rounded-xs border-orange-100">
          <p className=" text-sm text-gray-700">Free</p>
          <p className="font-medium">${freeAmount > 0 ? freeAmount : 0.00}</p>
        </div>
      </div>
      <div className="p-4 bg-orange-100/70  rounded-lg " >
      <div className="flex justify-between">
        <h3 className="font-medium text-lg">Latest Spending</h3>
        <Link to ='/transactions' className="flex gap-1 items-center text-gray-700 text-sm"> See All <IoCaretForwardOutline  /> </Link>
      </div>
      {
        filteredTransaction.length === 0 ? 
        <p className="my-5 text-sm text-gray-500">You haven't made any spending yet.</p> :
        filteredTransaction.slice(-3).map(tx=>(
            <div key={tx.id} className="flex justify-between items-center  py-2 border-b border-gray-300">
                <div className="text-sm font-medium">{tx.name}</div>
                <div className="flex flex-col  items-end">
                <p
                    className={`text-lg font-medium ${
                      tx.amount >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.amount >= 0
                      ? `+$${tx.amount}`
                      : `-$${Math.abs(tx.amount)}`}
                  </p>
                  <p className="text-xs text-gray-700">{tx.date}</p>
                </div>
            </div>
        ))
      }
      </div>
    </Panel>
  );
};

export default BudgetCard;
