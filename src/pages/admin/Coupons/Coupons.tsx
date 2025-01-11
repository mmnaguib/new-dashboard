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
    console.log(res.data);
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
            <th>الاسم</th>
            <th>الكود</th>
            <th>نسبة الخصم</th>
            <th>تاريخ الخصم</th>
            <th>عدد مرات الاستخدام</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon.id}>
              <td>{index + 1}</td>
              <td>{coupon.bloggerName}</td>
              <td>{coupon.name}</td>
              <td>{coupon.code}</td>
              <td>
                {coupon.discountValue} / {coupon.discountType}
              </td>
              <td>
                {coupon.startDate.toString()} / {coupon.endDate.toString()}
              </td>
              <td>{coupon.usageCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
