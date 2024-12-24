import axiosInstance from "../utils/AxiosInstance";

const token = localStorage.getItem("authToken");
const user = localStorage.getItem("user");

const ProductService = {
  getAllProducts: async () => {
    const req = axiosInstance
      .get("Product")
      .then((res) => res.data.items)
      .catch((err) => {
        console.log(err);
      });
    return req;
  },

  addNewProduct: async (
    title: string,
    description: string,
    image: File | null,
    price: number,
    quantity: number,
    category: number
  ) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("Quantity", quantity.toString());
    formData.append("categoryId", category.toString());
    formData.append("userId", user ? JSON.parse(user).userId : "");

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axiosInstance.post("Product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (err: any) {
      console.error("Error adding Product:", err.response?.data || err.message);
      return err.response?.data;
    }
  },

  deleteProduct: async (id: number) => {
    await axiosInstance.delete(`Product/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getAllProductsAccourdingToCategory: async (id: number) => {
    const req = axiosInstance
      .get(`Product?categoryID=${id}`)
      .then((res) => res.data.items)
      .catch((err) => {
        console.log(err);
      });
    return req;
  },
};

export default ProductService;
