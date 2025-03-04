import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNewTransaction from "../components/AddNewTransaction";
import Modal from "../components/Modal";

const Transactions = () => {
  const [val, setVal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const transactions = useSelector((state) => state.transactions);
  const [transactionList, setTransactionList] = useState(transactions);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    setTransactionList(transactions);
    setCurrentPage(1);
  }, [transactions]);

  const totalPages = Math.ceil(transactionList.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const paginatedTransactions = transactionList.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  const handleChange = (e) => {
    const searchVal = e.target.value;
    setVal(searchVal);
    const filtered = transactions.filter((tx) =>
      tx.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setTransactionList(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-10">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Transactions</h2>
        <button
          className=" bg-black text-white px-2 py-3 rounded-md"
          onClick={() => setShowModal(true)}
        >
          +Add New Transaction
        </button>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            heading={"Add New Transaction"}
          >
            <AddNewTransaction onClose={() => setShowModal(false)}/>
          </Modal>
        )}
      </div>
      <div className="mt-15 mx-auto p-6 bg-white shadow-md rounded-lg">
        <div>
          <input
            type="text"
            value={val}
            onChange={handleChange}
            placeholder="Search Transaction"
            className="border border-gray-500 rounded-md p-3 focus:outline-0 w-[30%]"
          />
        </div>
        <table className="w-full mt-5">
          <thead className=" border-b border-gray-400">
            <tr>
              <th className="p-3 text-left">Recipient / Sender</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Transaction Date</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {!paginatedTransactions || paginatedTransactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="mx-auto text-center font-bold ">
                  No Transactions Found
                </td>
              </tr>
            ) : (
              paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-400 text-xs ">
                  <td className="p-3 text-left font-medium text-sm">
                    {tx.name}
                  </td>
                  <td className="p-3 text-left">{tx.category}</td>
                  <td className="p-3 text-left">{tx.date}</td>
                  <td
                    className={`p-3 text-right font-bold ${
                      tx.amount >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.amount >= 0
                      ? `+$${tx.amount}`
                      : `-$${Math.abs(tx.amount)}`}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <div className="font-semibold px-5 py-2 rounded-lg bg-black text-white">
            {totalPages <= 1 ? currentPage : `${currentPage} of ${totalPages}`}
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
      </div>
    </div>
  );
};

export default Transactions;
