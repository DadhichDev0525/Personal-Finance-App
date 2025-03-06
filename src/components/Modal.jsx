import Panel from "./Panel";

const Modal = ({ onClose,heading,children }) => {
  const handleOutsideClick = (e) => {
    // If user clicks directly on the background overlay, close the modal
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };
  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-zinc-950/85 "
      onClick={handleOutsideClick} // Listen for clicks
    >
      <Panel
        className="opacity-100 lg:p-10 w-1/3 shadow-lg min-w-2xs "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{heading}</h2>
          <button onClick={onClose} className="text-gray-600 text-xl cursor-pointer">
            &times;
          </button>
        </div>
        {children}
      </Panel>
    </div>
  );
};

export default Modal;
