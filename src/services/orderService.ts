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
    detailedAddress: string,
    notes: string,
    phoneNumebr: string
  ) => {
    try {
      return await axiosInstance.post(`Orders`, {
        userId,
        shoppingCartId,
        shippingAddress,
        detailedAddress,
        notes,
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

  updateOrderStatus: async (orderId: string) => {
    try {
      return await axiosInstance.put(`Orders/CancellOrder/${orderId}`);
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

  cancelOrder: async (orderId: string) => {
    try {
      return await axiosInstance.put(`Orders/Cancel/${orderId}`);
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

  addDiscount: async (orderId: string, code: string) => {
    const req = await axiosInstance
      .get(`Coupons/apply?orderId=${orderId}&couponCode=${code}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return req;
  },
};

export default OrderService;
