import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { addTodo } from "../../redux/slices/todos";
import TodoList from "./TodoList";
import FilterTodo from "./FilterTodo";
import { useAppDispatch } from "../../redux/store";

const Todos = () => {
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (name.trim().length === 0)
      return toast.error("Please enter a valid name!");

    dispatch(addTodo(name));
    setName("");
  };

  return (
    <div className="flex justify-center mt-10 px-5 py-10 flex-col items-center bg-pink-50 w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-medium mb-20">TODO APP</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-full max-w-[800px] flex gap-5 mb-10"
      >
        <input
          type="text"
          placeholder="Enter something..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white px-4 py-2 flex-1 outline-none border border-white focus:border-pink-300"
        />
        <button
          onClick={handleAddTodo}
          className="bg-pink-400 px-4 py-1 text-white font-bold  hover:bg-pink-500 transition-colors duration-150 cursor-pointer"
        >
          <GoPlus className="size-6" />
        </button>
      </form>

      <FilterTodo />
      <TodoList />
    </div>
  );
};

export default Todos;
