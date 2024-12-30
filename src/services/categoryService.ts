import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";
const token = localStorage.getItem("authToken");
const user = localStorage.getItem("user");
const CategoryService = {
  getAllCategories: async () => {
    const req = axiosInstance
      .get("Categories")
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    return req;
  },

  addNewCategory: async (
    name: string,
    description: string,
    image: File | null
  ) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("userId", user ? JSON.parse(user).userId : "");
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axiosInstance.post("Categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
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

  updateCategory: async (
    id: number,
    name: string,
    description: string,
    image: File | null
  ) => {
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);
    try {
      const res = await axiosInstance.put(`Categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
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

  deleteCategory: async (id: number) => {
    try {
      await axiosInstance.delete(`Categories/${id}`, {
        headers: {
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
            toast.error(`${errors[field]}`);
          }
        });
      }
    }
  },

  getCategory: async (id: number) => {
    const req = await axiosInstance
      .get(`categories/${id}`)
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    return req;
  },
};

export default CategoryService;
