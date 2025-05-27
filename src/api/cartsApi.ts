import axiosClient from "./axiosConfig";

export interface CartItem {
  id: string;
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
  id: string;
  quantity: number;
}

const cartApi = {
  getAll: async () => {
    const res = await axiosClient.get("/cart");
    return res.data as CartItem[];
  },

  getById: async (id: string) => {
    try {
      const res = await axiosClient.get(`/cart/${id}`);
      return res.data as CartItem;
    } catch (err: any) {
      if (err.response?.status === 404) {
        return undefined;
      }
      throw err;
    }
  },

  add: async (item: CartItem) => {
    const res = await axiosClient.post("/cart", item);
    return res.data as CartItem;
  },

  updateQuantity: async (data: UpdateCartPayload) => {
    const res = await axiosClient.patch(`/cart/${data.id}`, {
      quantity: data.quantity,
    });
    return res.data as CartItem;
  },

  remove: async (id: string) => {
    const res = await axiosClient.delete(`/cart/${id}`);
    return res.data as CartItem;
  },

  findByProductId: async (productId: number) => {
    try {
      const res = await axiosClient.get(`/cart?productId=${productId}`);
      return res.data as CartItem[];
    } catch (err: any) {
      if (err.response?.status === 404) {
        return undefined;
      }
      throw err;
    }
  },
};

export default cartApi;
