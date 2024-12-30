import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";
const token = localStorage.getItem("authToken");

const BannerService = {
  getAllBanners: async () => {
    const req = await axiosInstance
      .get("Panners")
      .then((res) => res.data)
      .catch((err) => toast.error(err));
    return req;
  },

  addNewImage: async (image: File | null) => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

    try {
      await axiosInstance.post("Panners", formData, {
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
            toast.error(`${errors[field]}`);
          }
        });
      }
    }
  },

  removeImage: async (id: number) => {
    try {
      await axiosInstance.delete(`Panners/${id}`, {
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
            toast.error(`${errors[field]}`);
          }
        });
      }
    }
  },
};

export default BannerService;
