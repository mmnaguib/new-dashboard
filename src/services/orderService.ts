import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";
const token = localStorage.getItem("authToken");

const OrderService = {
  getAllOrders: async (status: string) => {
    const req = axiosInstance
      .get(`Orders/GetOrdersByStatus/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    return req;
  },
  addNewOrder: async (
    userId: string,
    shoppingCartId: number,
    shippingAddress: string,
    phoneNumebr: string
  ) => {
    try {
      return await axiosInstance.post(`Orders`, {
        userId,
        shoppingCartId,
        shippingAddress,
        phoneNumebr,
      });
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

  getUserOrder: async (orderId: string) => {
    const req = await axiosInstance
      .get(`Orders/GetOrder/${orderId}`)
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    return req;
  },
};

export default OrderService;
