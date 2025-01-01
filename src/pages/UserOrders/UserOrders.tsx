import React, { Fragment, useEffect, useState } from "react";
import UserService from "../../services/userServices";
import { IOrderProps } from "../../interface";

const UserOrders = () => {
  const [orders, setOrders] = useState<IOrderProps[]>([]);
  const userId = JSON.parse(localStorage.getItem("user")!).userId;
  const getMyOrders = async (userId: string) => {
    const res = await UserService.getUserOrders(userId);
    setOrders(res);
  };

  useEffect(() => {
    getMyOrders(userId);
  }, [userId]);
  return (
    <>
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>رقم الطلب</th>
            <th>اسم المنتج</th>
            <th>العنوان</th>
            <th>التاريخ</th>
            <th>السعر</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.orderId}>
              <th>{idx + 1}</th>
              <th>{order.orderId}</th>
              <th>
                {order.items.map((item) => (
                  <Fragment key={item.productId}>
                    <span>{item.title}</span>
                    <br />
                  </Fragment>
                ))}
              </th>
              <th>{order.shippingAddress}</th>
              <th>{order.orderDate.slice(0, 10)}</th>
              <th>{order.totalAmount}</th>
              <th>{order.status}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserOrders;
