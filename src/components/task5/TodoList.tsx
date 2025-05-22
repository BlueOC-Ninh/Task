import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useMemo } from "react";
import { deleteTodo, markTodo } from "../../redux/slices/todos";
import DeleteConfirmModal from "../DeleteConfirmModal";
import { useAppDispatch, useAppSelector } from "../../redux/store";
const TodoList = () => {
  const { todos, search, status } = useAppSelector((state) => state.todos);

  const filteredTodos = useMemo(() => {
    if (status === "all") {
      return todos.filter((item) => item.name.includes(search));
    }
    const convertStatus = status === "done" ? true : false;
    return todos.filter(
      (item) => item.name.includes(search) && item.isDone === convertStatus
    );
  }, [search, status, todos]);

  const dispatch = useAppDispatch();

  const handleChangeStatus = (id: string) => {
    dispatch(markTodo(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      {filteredTodos.length > 0 &&
        filteredTodos.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-b-gray-200 pb-2"
          >
            <p className={`${item.isDone ? "line-through text-gray-500" : ""}`}>
              {item?.name}
            </p>
            <div className="flex gap-5">
              <DeleteConfirmModal
                handleDelete={() => handleDelete(item.id)}
                className="bg-red-200 text-white px-2 py-1 cursor-pointer hover:bg-red-800 transition-colors"
              />

              {item?.isDone ? (
                <button
                  onClick={() => handleChangeStatus(item.id)}
                  className="bg-yellow-400 text-white px-2 py-1 cursor-pointer hover:bg-yellow-600 transition-colors"
                >
                  <IoClose />
                </button>
              ) : (
                <button
                  onClick={() => handleChangeStatus(item.id)}
                  className="bg-green-600 text-white px-2 py-1 cursor-pointer hover:bg-green-800 transition-colors"
                >
                  <TiTick />
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
