import { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { resetTimer, toggleTimer } from "../../redux/slices/timer/timer";
import { toast } from "react-toastify";
import { addTodo } from "../../redux/slices/todos/todos";
import { GoPlus } from "react-icons/go";

const Addtodo = () => {
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    dispatch(toggleTimer(true));
  };

  const handleAddTodo = () => {
    if (name.trim().length === 0)
      return toast.error("Please enter a valid name!");
    dispatch(addTodo(name));
    setName("");
    dispatch(resetTimer());
  };

  const handleOffTimer = () => {
    dispatch(toggleTimer(false));
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className=" w-full max-w-[800px] flex gap-5 mb-10"
    >
      <input
        type="text"
        placeholder="Enter something..."
        value={name}
        onBlur={handleOffTimer}
        onChange={handleChangeName}
        className="bg-white px-4 py-2 flex-1 outline-none border border-white focus:border-pink-300"
      />
      <button
        onClick={handleAddTodo}
        className="bg-pink-400 px-4 py-1 text-white font-bold  hover:bg-pink-500 transition-colors duration-150 cursor-pointer"
      >
        <GoPlus className="size-6" />
      </button>
    </form>
  );
};

export default Addtodo;
