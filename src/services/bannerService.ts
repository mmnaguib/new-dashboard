import axiosInstance from "../utils/AxiosInstance";
const token = localStorage.getItem("authToken");

const BannerService = {
  getAllBanners: async () => {
    const req = await axiosInstance
      .get("Panners")
      .then((res) => res.data)
      .catch((err) => console.log(err));
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
    } catch (err) {
      console.log(err);
    }
  },

  removeImage: async (id: number) => {
    await axiosInstance.delete(`Panners/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default BannerService;
