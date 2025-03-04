import { useSelector } from "react-redux";
const OverviewPage = () => {
  const transactions = useSelector(state=>state.transactions)
  const {income,expanse} = transactions.reduce((acc,tx)=>{
    const amount =Number(tx.amount)
    if(amount >= 0){
       acc.income += amount;
    }else{
       acc.expanse += Math.abs(amount)
    }
    return acc
  },{income: 0, expanse: 0})


  return <div className="w-full p-10">
    <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Overview</h2>
        {/* <button className=" bg-black text-white px-2 py-3 rounded-md">
          Logout
        </button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between w-full my-5">
        <div className="max-w-md p-6 bg-zinc-800 text-white shadow-md rounded-lg">
            <p>Current Balance</p>
            <p className="font-semibold text-4xl mt-2">${(income - expanse).toFixed(2)}</p>
        </div>
        <div className="max-w-md p-6 bg-white shadow-md rounded-lg">
          <p className="text-gray-600 font-semibold">Income</p>
          <p className="font-semibold text-4xl mt-2">${income.toFixed(2)}</p>
        </div>
        <div className="max-w-md p-6 bg-white shadow-md rounded-lg">
        <p className="text-gray-600 font-semibold">Expanse</p>
        <p className="font-semibold text-4xl mt-2">${expanse.toFixed(2)}</p>
        </div>
      </div>
  </div>;
};

export default OverviewPage;
