import axiosClient from "./axiosConfig";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CreateProductPayload {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface UpdateProductPayload {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  category?: string;
}

const productApi = {
  getAll: async ({
    _limit = 5,
    _page = 1,
    search = "",
  }: {
    _limit?: number;
    _page?: number;
    search?: string;
  }) => {
    const res = await axiosClient.get(
      `/products?_limit=${_limit}&_page=${_page}&name_like=${search}`
    );
    return res.data as Product[];
  },

  getById: (id: number) => axiosClient.get(`/products/${id}`),

  add: (data: CreateProductPayload) => axiosClient.post("/products", data),

  update: (id: number, data: UpdateProductPayload) =>
    axiosClient.put(`/products/${id}`, data),

  remove: (id: number) => axiosClient.delete(`/products/${id}`),
};

export default productApi;
