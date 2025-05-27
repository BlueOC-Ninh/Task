import { useEffect } from "react";
import {
  decrementQuantity,
  deleteFromCart,
  getCarts,
  incrementQuantity,
} from "../../redux/slices/carts/carts";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const CartList = () => {
  const dispatch = useAppDispatch();
  const { carts } = useAppSelector((state) => state.carts);

  useEffect(() => {
    dispatch(getCarts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
      {carts.length > 0 ? (
        <div className="space-y-4">
          {carts.map((item) => (
            <div
              key={item.productId}
              className="flex items-center p-4 border rounded-lg shadow-sm"
            >
              <img
                src={item.productImg}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded mr-4"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-sm text-gray-600">
                  Giá: {item.productPrice.toLocaleString()}đ
                </p>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.productId))}
                    className="px-2 py-1 text-sm bg-gray-200 rounded-l hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.productId))}
                    className="px-2 py-1 text-sm bg-gray-200 rounded-r hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm font-medium text-green-600 mt-2">
                  Tổng: {(item.productPrice * item.quantity).toLocaleString()}đ
                </p>
              </div>

              <button
                onClick={() => dispatch(deleteFromCart(item.productId))}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
      )}
    </div>
  );
};

export default CartList;
