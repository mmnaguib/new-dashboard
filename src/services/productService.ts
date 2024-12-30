import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";

const token = localStorage.getItem("authToken");
const user = localStorage.getItem("user");

const ProductService = {
  getAllProducts: async () => {
    const req = axiosInstance
      .get("Product")
      .then((res) => res.data.items)
      .catch((err) => {
        toast(err.response?.data);
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
      await axiosInstance.post("Product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        Object.keys(errors).forEach((field) => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(`${field} Error: ${errors[field]}`);
          }
        });
      }
    }
  },

  deleteProduct: async (id: number) => {
    try {
      await axiosInstance.delete(`Product/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        Object.keys(errors).forEach((field) => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(`${field} Error: ${errors[field]}`);
          }
        });
      }
    }
  },

  getAllProductsAccourdingToCategory: async (id: number) => {
    const req = axiosInstance
      .get(`Product?categoryID=${id}`)
      .then((res) => res.data.items)
      .catch((err) => {
        return toast.error(err.response?.data);
      });
    return req;
  },
};

export default ProductService;
