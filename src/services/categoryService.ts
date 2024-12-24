import axiosInstance from "../utils/AxiosInstance";
const token = localStorage.getItem("authToken");
const user = localStorage.getItem("user");
const CategoryService = {
  getAllCategories: async () => {
    const req = axiosInstance
      .get("Categories")
      .then((res) => res.data)
      .catch((err) => err.response.data);
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
      console.error(
        "Error adding category:",
        err.response?.data || err.message
      );
      return err.response?.data;
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
      console.error(
        "Error adding category:",
        err.response?.data || err.message
      );
      return err.response?.data;
    }
  },

  deleteCategory: async (id: number) => {
    await axiosInstance.delete(`Categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getCategory: async (id: number) => {
    const req = await axiosInstance
      .get(`categories/${id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return req;
  },
};

export default CategoryService;
