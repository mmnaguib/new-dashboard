import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import { ICoupon } from "../../../interface";
import AddCoupon from "./AddCoupon";

const Coupons = () => {
  const token = localStorage.getItem("authToken");
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const getAllBloggers = useCallback(async () => {
    const res = await axiosInstance.get("Coupons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCoupons(res.data);
  }, [token]);

  useEffect(() => {
    getAllBloggers();
  }, [getAllBloggers]);

  return (
    <div>
      <AddCoupon setCoupons={setCoupons} />
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
          {coupons.map((coupon, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{coupon.name}</td>
              <td>{coupon.code}</td>
              <td>{coupon.bloggerId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
