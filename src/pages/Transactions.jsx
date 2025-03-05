import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddNewTransaction from "../components/AddNewTransaction";
import Modal from "../components/Modal";
import DropDown from "../components/DropDown";
import { Categories, sortingOptions } from "../dropdownOptions";
import { BiSolidAddToQueue } from "react-icons/bi";

const Transactions = () => {
  const [val, setVal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const transactions = useSelector((state) => state.transactions);
  const [filteredTransaction, setFilteredTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Latest");
  const [selectedCategory, setSelectedCategory] = useState("All Transactions");
  const transactionsPerPage = 10;
  const totalPages = Math.ceil(
    filteredTransaction.length / transactionsPerPage
  );
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const paginatedTransactions = filteredTransaction.slice(
    startIndex,
    startIndex + transactionsPerPage
  );
  useEffect(() => {
    let updatedList = [...transactions];
    if (selectedCategory !== "All Transactions") {
      updatedList = updatedList.filter(
        (tx) => tx.category === selectedCategory
      );
    }
    if (val.trim() !== "") {
      updatedList = updatedList.filter((tx) =>
        tx.name.toLowerCase().includes(val.toLowerCase())
      );
    }
    updatedList.sort((a, b) => {
      switch (sortOption) {
        case "Latest":
          return new Date(b.date) - new Date(a.date);
        case "Oldest":
          return new Date(a.date) - new Date(b.date);
        case "Highest":
          return b.amount - a.amount;
        case "Lowest":
          return a.amount - b.amount;
        case "A-Z":
          return a.name.localeCompare(b.name);
        case "Z-A":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredTransaction(updatedList);
  }, [transactions, val, sortOption, selectedCategory]);

  const handleChange = (e) => {
    setVal(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-10">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Transactions</h2>
        <button
          className=" bg-black text-white text-sm px-2 py-3 rounded-md"
          onClick={() => setShowModal(true)}
        >
          <span className="text-md hidden sm:inline">+</span><span className="hidden sm:inline">Add New Transaction</span>
          <span className="block text-lg px-2 sm:hidden"><BiSolidAddToQueue  /></span>
        </button>
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            heading={"Add New Transaction"}
          >
            <AddNewTransaction onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
      <div className="mt-15 mx-auto p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <input
            type="text"
            value={val}
            onChange={handleChange}
            placeholder="Search Transaction"
            className="border border-gray-500 rounded-md p-3 max-w-lg focus:outline-0 md:w-[30%]"
          />
          <div className="flex flex-col md:flex-row md:items-center gap-x-5">
            <span className="text-sm text-gray-400 pt-2">Sort by</span>
            <DropDown
              selected={sortOption}
              setSelected={(e) => setSortOption(e.target.value)}
              Options={sortingOptions}
              label=""
              className="flex justify-between"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-x-5">
            <span className="text-sm text-gray-400 pt-2">
              Filter by Category
            </span>
            <DropDown
              selected={selectedCategory}
              setSelected={(e) => setSelectedCategory(e.target.value)}
              Options={["All Transactions", ...Categories]}
              label=""
              className="flex gap-3"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
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
        </div>
        <div className="flex justify-between items-center mt-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className={`px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 ${totalPages <= 1 && 'hidden'}`}
          >
            Previous
          </button>
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`cursor-pointer px-2 rounded-md transition duration-200 ${
                  currentPage === page
                    ? "bg-zinc-900 text-white"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                } `}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={totalPages === 0 || currentPage >= totalPages}
            className={`px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50 ${totalPages <= 1 && 'hidden'}`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
