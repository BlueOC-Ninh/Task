import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Product } from "../../api/productsApi";
import { useAppSelector } from "../../redux/store";
import { getProducts } from "../../redux/slices/products/products";
import { addToCart } from "../../redux/slices/carts/carts";
import type { CartItem } from "../../api/cartsApi";

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = (product: CartItem) => {
    dispatch(addToCart(product));
  };

  if (status === "loading")
    return <div className="text-center mt-10">Loading...</div>;
  if (status === "failed")
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="border rounded-lg shadow-md p-4 flex flex-col items-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-40 h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold mb-2 text-center">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2 text-center">
            {product.description}
          </p>
          <p className="text-blue-600 font-bold mb-4">
            {product.price.toLocaleString()} VND
          </p>
          <button
            onClick={() =>
              handleAddToCart({
                productId: product.id,
                quantity: 1,
                productImg: product.image,
                productName: product.name,
                productPrice: product.price,
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      ))}
    </div>
  );
}
