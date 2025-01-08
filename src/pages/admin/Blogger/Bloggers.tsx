import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import AddBlogger from "./AddBlogger";
import { IBlogger } from "../../../interface";

const Bloggers = () => {
  const token = localStorage.getItem("authToken");
  const [bloggers, setBloggers] = useState<IBlogger[]>([]);
  const getAllBloggers = useCallback(async () => {
    const res = await axiosInstance.get("Blogger", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setBloggers(res.data);
  }, [token]);

  useEffect(() => {
    getAllBloggers();
  }, [getAllBloggers]);

  return (
    <div>
      <AddBlogger setBloggers={setBloggers} />
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>المسوق</th>
            <th>البريد الالكتروني</th>
            <th>رقم الهاتف</th>
          </tr>
        </thead>
        <tbody>
          {bloggers.map((blogger, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{blogger.name}</td>
              <td>{blogger.email}</td>
              <td>{blogger.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bloggers;
