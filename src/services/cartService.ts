import axiosInstance from "../utils/AxiosInstance";
const CartService = {
  getUserCart: async (userId: string) => {
    if (!userId) return;
    const req = await axiosInstance
      .get(`ShoppingCart/${userId}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
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
    } catch (err) {
      console.error("Error adding product to cart:", err);
      throw err;
    }
  },

  deleteItemFromQuantity: async (id: number) => {
    await axiosInstance.delete(`ShoppingCart/remove/${id}`);
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    await axiosInstance.put(`ShoppingCart/update/${id}?quantity=${quantity}`);
  },
};

export default CartService;
