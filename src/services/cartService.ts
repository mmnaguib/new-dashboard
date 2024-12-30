import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";
const CartService = {
  getUserCart: async (userId: string) => {
    if (!userId) return;
    const req = await axiosInstance
      .get(`ShoppingCart/${userId}`)
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    return req;
  },
  addProductToCart: async (
    userId: string,
    productId: number,
    quantity: number
  ) => {
    try {
      const res = await axiosInstance.post(
        `ShoppingCart/add?userId=${userId}&productId=${productId}&quantity=${quantity}`
      );
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        Object.keys(errors).forEach((field) => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(`${errors[field]}`);
          }
        });
      }
    }
  },

  deleteItemFromQuantity: async (id: number) => {
    try {
      await axiosInstance.delete(`ShoppingCart/remove/${id}`);
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        Object.keys(errors).forEach((field) => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(`${errors[field]}`);
          }
        });
      }
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      await axiosInstance.put(`ShoppingCart/update/${id}?quantity=${quantity}`);
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        Object.keys(errors).forEach((field) => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(`${errors[field]}`);
          }
        });
      }
    }
  },
};

export default CartService;
