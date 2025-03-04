import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { deletePot } from "../store";
import Modal from "./Modal";
import AddNewPot from "./AddNewPot";
import ManagePotFunds from "./ManagePotFunds";
import Panel from "./Panel";


const PotCard = ({ pot }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [addMoney,setAddMoney]= useState(false)
  const [withdraw,setWithdraw] = useState(false)
  const color = pot.theme.toLowerCase();
  const balancePercentage = (pot.balance / pot.targetAmount) * 100;

  const handleDelete = () => {
    dispatch(deletePot(pot.id));
  };

  return (
    <Panel className="max-w-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="font-bold text-lg">{pot.name}</h3>
        </div>
        <div className="cursor-pointer flex gap-2 text-xl">
          <CiEdit onClick={() => setIsEdit(true)} />
          <MdDeleteOutline onClick={handleDelete} />
          {isEdit && (
            <Modal onClose={() => setIsEdit(false)} heading="Edit Pot">
              <AddNewPot
                onClose={() => setIsEdit(false)}
                isEdit={isEdit}
                pot={pot}
              />
            </Modal>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <p className="text-sm text-gray-500 font-medium">Total Saved</p>
        <p className="font-bold text-gray-800 text-3xl">
          ${pot.balance.toFixed(2)}
        </p>
      </div>
      <div className="w-full bg-gray-500 h-2 rounded mt-5">
        <div
          className="h-full  rounded"
          style={{ backgroundColor: color, width: `${balancePercentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm text-gray-500">{balancePercentage.toFixed(2)}%</p>
        <p className="text-sm text-gray-500">Target of ${pot.targetAmount}</p>
      </div>
      <div className="flex justify-between pt-10">
        <button onClick={()=>setAddMoney(true)} className="bg-orange-50 py-2 w-[45%] rounded-md hover:bg-white hover:border cursor-pointer">
        <span className="text-lg">+</span>Add Money
        </button>
        {addMoney && (
            <Modal onClose={()=>setAddMoney(false)} heading={`Add to "${pot.name}"`}>
                <ManagePotFunds onClose={()=>setAddMoney(false)} pot={pot} mode='add'/>
            </Modal>
        )}
        <button onClick={()=>setWithdraw(true)} className="bg-orange-50 py-2 w-[45%] rounded-md hover:bg-white hover:border cursor-pointer">
          Withdraw
        </button>
        {withdraw && (
            <Modal onClose={()=>setWithdraw(false)} heading={`Withdraw from "${pot.name}"`}>
                <ManagePotFunds onClose={()=>setWithdraw(false)} pot={pot} mode='withdraw'/>
            </Modal>
        )}
      </div>
    </Panel>
  );
};

export default PotCard;
