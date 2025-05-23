import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

interface DeleteConfirmModalProps {
  handleDelete: () => void;
  className?: string;
}
const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  handleDelete,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    handleDelete();
    setIsOpen(false);
  };

  return (
    <div className={className ?? ""}>
      <MdOutlineDelete
        onClick={handleOpen}
        className="text-red-400 cursor-pointer"
      />

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-60 z-40"></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="w-full max-w-lg bg-white p-4 rounded-lg text-black">
              <h2 className="text-xl font-semibold mb-5">Confirm to delete</h2>
              <p className="text-sm">Are you sure to delete this task!</p>
              <p className="text-sm">It will can't be restored</p>
              <div className="flex justify-end gap-5">
                <button
                  className="bg-[#dd4a4a] text-white rounded-lg w-fit px-4 py-2 text-sm cursor-pointer"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#e2ebfa] text-[#4b8ae9] rounded-lg w-fit px-4 py-2 text-sm cursor-pointer hover:bg-blue-200"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteConfirmModal;
