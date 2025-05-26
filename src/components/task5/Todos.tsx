import { useEffect } from "react";
import TodoList from "./TodoList";
import FilterTodo from "./FilterTodo";
import { useAppDispatch } from "../../redux/store";
import Timer from "./Timer";
import Addtodo from "./Addtodo";

const Todos = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: "todos/fetchTodos" });
  }, []);

  return (
    <div className="flex justify-center mt-10 px-5 py-10 flex-col items-center bg-pink-50 w-full max-w-4xl mx-auto">
      <Timer />
      <h1 className="text-4xl font-medium mb-20">TODO APP</h1>

      <Addtodo />
      <FilterTodo />
      <TodoList />
    </div>
  );
};

export default Todos;
