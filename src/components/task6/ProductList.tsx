import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { Product } from "../../api/productsApi";
import { useAppSelector } from "../../redux/store";
import { getProducts } from "../../redux/slices/products/products";
import type { CartItem } from "../../api/cartsApi";
import { v4 as uuidv4 } from "uuid";
import { addToCart } from "../../redux/slices/carts/carts";
export default function ProductList() {
  const dispatch = useDispatch();
  const { products, status } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
      {products.length > 0 ? (
        products.map((product: Product) => (
          <div
            key={product.id}
            className="rounded-lg shadow-md  flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover rounded-md mb-4"
            />
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-2 text-center">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2 text-center">
                {product.description}
              </p>
              <p className="text-[#F15E2C] font-bold mb-4">
                {product.price.toLocaleString()} VND
              </p>
              <button
                onClick={() =>
                  handleAddToCart({
                    id: uuidv4(),
                    productId: product.id,
                    quantity: 1,
                    productImg: product.image,
                    productName: product.name,
                    productPrice: product.price,
                  })
                }
                className="bg-black text-white px-4 py-2 rounded hover:bg-slate-800 cursor-pointer transition"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className=" bg-black p-5 text-white">
          <h1>Không tìm thấy sản phẩm</h1>
        </div>
      )}
    </div>
  );
}
