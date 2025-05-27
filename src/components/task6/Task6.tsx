import Cart from "./Cart";
import ProductList from "./ProductList";
import SearchProducts from "./SearchProducts";

const Task6 = () => {
  return (
    <div>
      <SearchProducts />
      <ProductList />
      <h1 className="text-center text-4xl text-blue-700 font-bold">Cart</h1>
      <Cart />
    </div>
  );
};

export default Task6;
