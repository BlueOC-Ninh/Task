import { filterByName } from "../../redux/slices/products/products";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const SearchProducts = () => {
  const { search } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterByName(e.target.value));
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className=" mx-auto flex items-center justify-center my-10 gap-4"
    >
      <input
        type="text"
        onChange={handleChangeSearchValue}
        value={search}
        className="outline-none border border-gray-200 px-4 py-2 rounded-lg w-full max-w-md"
      />
      <button className="bg-black text-white rounded-lg px-6 py-2 cursor-pointer hover:bg-gray-800 transition-colors duration-150">
        Search
      </button>
    </form>
  );
};

export default SearchProducts;
