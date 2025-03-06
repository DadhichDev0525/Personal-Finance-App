import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { IoCaretForwardOutline } from "react-icons/io5";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import Panel from "../components/Panel";
import BudgetPieChart from "../components/BudgetPieChart";
const OverviewPage = () => {
  const transactions = useSelector((state) => state.transactions);
  const pots = useSelector((state) => state.pots);
  const budgets = useSelector((state)=>state.budgets)
  const recurringTransactions = useMemo(() => transactions.filter((tx) => tx.recurring),[transactions])
  const today = new Date()
  const{paidBills, upcomingBills, dueSoonBills} = recurringTransactions.reduce(
    (acc,tx)=>{
      const date = new Date(tx.date).getTime()
      const amount = Math.abs(tx.amount)
      const differenceInDays =Math.ceil((date - today.getTime()) / (1000 * 3600 * 24))
      if(differenceInDays > 0 && differenceInDays < 4){
        acc.dueSoonBills += amount
      }
      if(date <= today.getTime()){
        acc.paidBills += amount
      }else{
        acc.upcomingBills += amount
      }
      return acc;
    },
    {paidBills :0, upcomingBills: 0, dueSoonBills: 0}
  );
  const { income, expanse } = transactions.reduce(
    (acc, tx) => {
      const amount = Number(tx.amount);
      if (amount >= 0) {
        acc.income += amount;
      } else {
        acc.expanse += Math.abs(amount);
      }
      return acc;
    },
    { income: 0, expanse: 0 }
  );
  const potsBalance = pots.reduce((acc, pot) => acc + pot.balance, 0);

  return (
    <div className="w-full p-10">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Overview</h2>
        {/* <button className=" bg-black text-white px-2 py-3 rounded-md">
          Logout
        </button> */}
      </div>
      <div className="grid grid-cols-1  gap-3 md:grid-cols-3 justify-between w-full my-7">
        <Panel className="md:max-w-md md:min-w-max w-full lg:max-w-xl bg-zinc-800 text-white ">
          <p>Current Balance</p>
          <p className="font-semibold text-4xl mt-2">
            {(income - expanse) >= 0 ?
               `$${(income - expanse).toFixed(2)}` :
               `-$${(Math.abs(income - expanse)).toFixed(2)}`
             }
          </p>
        </Panel>
        <Panel className="md:max-w-md md:min-w-max w-full lg:max-w-xl">
          <p className="text-gray-600 font-semibold">Income</p>
          <p className="font-semibold text-4xl mt-2">${income.toFixed(2)}</p>
        </Panel>
        <Panel className="md:max-w-md md:min-w-max w-full lg:max-w-xl">
          <p className="text-gray-600 font-semibold">Expanse</p>
          <p className="font-semibold text-4xl mt-2">${expanse.toFixed(2)}</p>
        </Panel>
      </div>

      <div className="grid grid-cols-1 items-start lg:grid-cols-2  gap-5 w-full my-5">
        <Panel >
          <div className="flex justify-between">
            <h3 className="font-medium text-lg">Pots</h3>
            <Link
              to="/pots"
              className="flex gap-1 items-center text-gray-700 text-sm font-medium"
            >
              See Details
              <IoCaretForwardOutline />
            </Link>
          </div>
          <div className="p-6 flex flex-col gap-5 md:flex-row ">
            <div className="px-6 py-3 bg-orange-50 min-w-1/2  rounded-lg shadow flex items-center gap-x-3">
              <div className="text-4xl">
                <PiCurrencyCircleDollarFill />
              </div>
              <div>
                <p className="text-gray-600 mb-2">Pots</p>
                <p className="md:text-3xl text-xl font-semibold">${potsBalance}</p>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-2 ">
              {pots.slice(0, 4).map((pot) => (
                <div
                  key={pot.id}
                  className="border-l-4 border-orange-800 px-3 rounded-sm"
                >
                  <p className="text-sm text-gray-600">{pot.name}</p>
                  <p className="text-lg font-medium">${pot.balance}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <div className='row-span-2 bg-white rounded-lg py-6 px-2 sm:p-6'>
        <div className="flex justify-between">
            <h3 className="font-medium text-lg">Budgets</h3>
            <Link
              to="/budgets"
              className="flex gap-1 items-center text-gray-700 text-sm font-medium"
            >
              See Details
              <IoCaretForwardOutline />
            </Link>
          </div>
          {
            budgets.length === 0 ?
            <p className="my-5 lg:h-36 text-sm font-semibold text-gray-500">No Data Provided</p> :
            <div className="flex justify-between flex-col md:flex-row mt-3">
            <div className="flex-1 min-h-72"><BudgetPieChart budgets={budgets} /></div>
            <div className="space-y-3 ">
              {budgets.slice(0,5).map(budget=>(
                <div
                key={budget.id}
                className="border-l-4 px-3 rounded-sm "
                style={{borderColor:budget.theme}}
              >
                <p className="text-sm text-gray-600">{budget.category}</p>
                <p className="text-lg font-medium">${Math.abs(budget.spent)}</p>
              </div>
              ))}
            </div>
          </div>
          }
        </div>
        <Panel className='row-span-2'>
        <div className="flex justify-between">
            <h3 className="font-medium text-lg">Transactions</h3>
            <Link
              to="/transactions"
              className="flex gap-1 items-center text-gray-700 text-sm font-medium"
            >
              See Details
              <IoCaretForwardOutline />
            </Link>
          </div>
          {
        transactions.length === 0 ? 
        <p className="my-5 lg:h-36 text-sm font-semibold text-gray-500">No Transactions Found</p> :
        <div className="my-5 min-h-28 ">
          {
             transactions.slice(0,5).map(tx=>(
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
       
      }
        </Panel>
        <Panel >
        <div className="flex justify-between">
            <h3 className="font-medium text-lg">Recurring Bills</h3>
            <Link
              to="/recurringbills"
              className="flex gap-1 items-center text-gray-700 text-sm font-medium"
            >
              See Details
              <IoCaretForwardOutline />
            </Link>
          </div>
          <div className="w-full space-y-4 my-7">
            <div className="flex justify-between items-center p-4 rounded-md border-l-4 border-green-700 bg-green-50 text-gray-500 text-sm font-medium">
              <p>Paid Bills</p>
              <p className="text-zinc-900 font-bold">${paidBills.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center p-4 rounded-md border-l-4 border-red-700 bg-red-50 text-gray-500 text-sm font-medium">
              <p>Total Upcoming</p>
              <p className="text-zinc-900 font-bold">${upcomingBills.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center p-4 rounded-md border-l-4 border-yellow-500 bg-yellow-50 text-gray-500 text-sm font-medium">
              <p>Due Soon</p>
              <p className="text-zinc-900 font-bold">${dueSoonBills.toFixed(2)}</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default OverviewPage;
