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
      .catch((err) => console.log(err));
    return req;
  },
  addNewOrder: async (
    userId: string,
    shoppingCartId: number,
    shippingAddress: string,
    phoneNumebr: string
  ) => {
    const req = await axiosInstance.post(`Orders`, {
      userId,
      shoppingCartId,
      shippingAddress,
      phoneNumebr,
    });
    console.log(req);
  },
};

export default OrderService;
