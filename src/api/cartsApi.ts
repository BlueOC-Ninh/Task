import axiosClient from "./axiosConfig";

export interface CartItem {
  productId: number;
  productImg: string;
  productName: string;
  productPrice: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export interface UpdateCartPayload {
  productId: number;
  quantity: number;
}

const cartApi = {
  getAll: async () => {
    const res = await axiosClient.get("/cart");
    return res.data as CartItem[];
  },

  getByProductId: async (id: number) => {
    const res = await axiosClient.get(`/cart?productId=${id}`);
    const data = res.data;
    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : undefined;
    }
    return data as CartItem | undefined;
  },

  add: async (item: CartItem) => {
    const res = await axiosClient.post("/cart", item);
    console.log(res);
    return res.data as CartItem;
  },

  incrementQuantity: async (id: number) => {
    const res = await axiosClient.patch(`/cart/product/${id}/increment`);
    return res.data as CartItem;
  },
  decrementQuantity: async (id: number) => {
    const res = await axiosClient.patch(`/cart/product/${id}}/decrement`);
    return res.data as CartItem;
  },
  remove: async (id: number) => {
    const res = await axiosClient.delete(`/cart/${id}`);
    return res.data as CartItem;
  },
};

export default cartApi;
