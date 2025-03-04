import { useSelector } from "react-redux";
import { useState } from "react";
import BudgetCard from "../components/BudgetCard";
import AddNewBudget from "../components/AddNewBudget";
import Modal from "../components/Modal";
import Panel from "../components/Panel";
import BudgetPieChart from "../components/BudgetPieChart";

const Budgets = () => {
  const [showModal, setShowModal] = useState(false);
  const Budgets = useSelector((state) => state.budgets);
  const totalSpent = Budgets.reduce((acc,b)=>acc + Number(b.spent),0)
  const totalMaxSpend = Budgets.reduce((acc,b)=>acc + Number(b.maxSpend),0)

  return (
    <div className="w-full p-10">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Budgets</h2>
        <button
          className=" bg-black text-white text-sm px-5 py-3 rounded-md "
          onClick={() => setShowModal(true)}
        >
          <span className="text-md">+</span>Add New Budget
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} heading={"Add New Budget"}>
            <AddNewBudget onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
        {Budgets.length === 0 ? (
          <p className="my-5 text-sm font-bold text-gray-500">
            You haven't created a Budget yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 items-start max-w-full mt-5 ">
            <Panel className="flex flex-col items-center gap-10  ">
            <div className="flex-1 min-h-72 w-full"><BudgetPieChart budgets={Budgets} /></div>
              <div className="flex flex-col gap-3 w-full">
                <h3 className="font-bold text-lg">Spending Summary</h3>
                {
                  Budgets.map(budget=><div key={budget.id} className="flex justify-between px-2 py-4 border-l-4 rounded-xs" style={{borderColor:budget.theme.toLowerCase()}}>
                    <p className="text-sm font-bold text-gray-600">{budget.category}</p>
                    <p className="text-sm font-medium text-gray-600"><span className="font-bold text-gray-950">${budget.spent.toFixed(2)}</span> of ${budget.maxSpend}</p>
                  </div>)
                }
              </div>
            </Panel>
            <div className="flex flex-col gap-y-2 flex-grow col-span-2 w-full items-end">
              {Budgets.map((budget) => (
                <BudgetCard budget={budget} key={budget.id} />
              ))}
            </div>
          </div>
        )}

    </div>
  );
};

export default Budgets;
