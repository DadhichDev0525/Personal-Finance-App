import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Panel from "../components/Panel";
import { RiBillFill,RiErrorWarningFill } from "react-icons/ri";

const RecurringBills = () => {
  const transactions = useSelector((state) => state.transactions);
  const recurringTransactions = useMemo(() => transactions.filter((tx) => tx.recurring),[transactions])
  const [val, setVal] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recurringBills, setRecurringBills] = useState(recurringTransactions);
  const billsPerPage = 6;
  const totalPages = Math.ceil(recurringBills.length / billsPerPage);
  const startIndex = (currentPage - 1) * billsPerPage;
  const paginatedBills = recurringBills.slice(
    startIndex,
    startIndex + billsPerPage
  );
  const today = new Date();
  const totalBill = recurringTransactions.reduce((acc,tx)=>acc + Math.abs(tx.amount),0)
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

  const handleChange = (e) => {
    const searchVal = e.target.value;
    setVal(searchVal);
    const filtered = recurringTransactions.filter((tx) =>
      tx.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setRecurringBills(filtered);
    setCurrentPage(1);
  };
  return (
    <div className="w-full p-10">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Overview</h2>
      </div>
      <div className="my-5 w-full flex flex-col lg:flex-row gap-5">
        <div className="flex flex-col md:flex-row lg:flex-col gap-5 min-w-max lg:min-w-sm ">
          <Panel className="bg-zinc-800 text-white flex md:flex-col gap-10  flex-1">
            <div className="text-4xl">
              <RiBillFill />
            </div>
            <div>
              <p className="font-semibold">Total Bills</p>
              <p className="text-4xl">${totalBill.toFixed(2)}</p>
            </div>
          </Panel>
          <Panel className=" flex-1">
            <h2 className="font-medium">Summary</h2>
            <div className="py-3 border-b border-gray-300 text-sm flex justify-between">
              <p className="text-gray-500">Paid Bills</p>
              <p className="text-gray-800 font-medium">${paidBills.toFixed(2)}</p>
            </div>
            <div className="py-3 border-b border-gray-300 text-sm flex justify-between">
              <p className="text-gray-500">Total Upcoming</p>
              <p className="text-gray-800 font-medium">${upcomingBills.toFixed(2)}</p>
            </div>
            <div className="py-3 text-sm flex justify-between">
              <p className="text-gray-500">Due Soon</p>
              <p className="text-red-800 font-medium">${dueSoonBills.toFixed(2)}</p>
            </div>
          </Panel>
        </div>
        <Panel className="flex-1 min-w-[265px]">
          <div className="p-4">
            <input
              type="text"
              value={val}
              onChange={handleChange}
              placeholder="Search Bills"
              className="border border-gray-500 rounded-md p-2 focus:outline-0 w-[40%]"
            />
          </div>
          <div className="overflow-x-auto">
          <table className=" mt-5 w-full">
            <thead className=" border-b border-gray-400 text-sm text-gray-600">
              <tr>
                <th className="w-1/3 p-3 text-left">Bill Title</th>
                <th className=" p-3 flex items-center justify-center"><p className="w-[120px] flex">Due Date</p></th>
                <th className=" p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {!paginatedBills || paginatedBills.length === 0 ? (
                <tr>
                  <td colSpan="4" className="mx-auto text-center font-bold ">
                    No Bills Found
                  </td>
                </tr>
              ) : (
                paginatedBills.map((bill) => {
                  const date = new Date(bill.date);
                  const day = date.getDate();
                  const differenceInDays =Math.ceil((date.getTime() - today.getTime()) / (1000 * 3600 * 24));
                  const dueSoon = (differenceInDays >= 0 && differenceInDays < 4)
                  return (
                    <tr
                      key={bill.id}
                      className="border-b border-gray-400 text-xs "
                    >
                      <td className="p-3 text-left font-medium text-sm">
                        {bill.name}
                      </td>
                      <td className="p-3 flex items-center justify-center">
                        <div className="flex w-[120px] items-center gap-x-5 text-xs">
                        Monthly - {day}th 
                        {dueSoon &&<span className="text-lg text-red-700"> <RiErrorWarningFill  /></span>}
                        </div>
                        </td>
                      <td className={`p-3 text-right font-bold text-sm ${dueSoon && 'text-red-700'}`}>
                        ${Math.abs(bill.amount).toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>
          <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <div className="flex justify-center space-x-2">
          {Array.from({length:totalPages},(_,i)=>i+1).map(page=>(
              <button
              key={page}
              onClick={()=>setCurrentPage(page)}
              className={`cursor-pointer px-2 rounded-md transition duration-200 ${
                currentPage === page 
                ? 'bg-zinc-900 text-white'
                :'bg-gray-100 text-black hover:bg-gray-200'
              } `}
              >{page}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={totalPages === 0 || currentPage >= totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
        </Panel>
      </div>
    </div>
  );
};

export default RecurringBills;
