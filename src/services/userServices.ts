import axiosInstance from "../utils/AxiosInstance";

const UserService = {
  getUserData: async (userId: string) => {
    const req = await axiosInstance
      .get(`Account/${userId}`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return req;
  },

  getUserOrders: async (userId: string) => {
    const res = await axiosInstance.get(`Orders/user/${userId}`);
    return res.data;
  },
};

export default UserService;
