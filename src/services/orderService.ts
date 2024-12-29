import axiosInstance from "../utils/AxiosInstance";
const OrderService = {
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
