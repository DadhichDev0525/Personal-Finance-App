import { useSelector } from "react-redux";
import { useState} from "react";
import AddNewPot from "../components/AddNewPot";
import PotCard from "../components/PotCard";
import Modal from "../components/Modal";

const Pots = () => {
  const [showModal, setShowModal] = useState(false);
  const pots = useSelector((state) => state.pots);
  return (
    <div className="w-full p-10">
      <div className="flex justify-between w-full">
        <h2 className="font-bold text-4xl">Pots</h2>
        <button
          className=" bg-black text-white text-sm px-5 py-3 rounded-md"
          onClick={() => setShowModal(true)}
        >
          <span className="text-md">+</span>Add New Pot
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)} heading={"Add New Pot"}>
            <AddNewPot onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
      <div className=" w-full mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pots.length === 0 ? (
          <p className="my-5 text-sm font-bold text-gray-500">
            You don't have a pot account yet.
          </p>
        ) : (
          pots.map((pot) => <PotCard pot={pot} key={pot.id} />)
        )}
      </div>
    </div>
  );
};

export default Pots;
