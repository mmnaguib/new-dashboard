import React, { Fragment, useCallback, useEffect, useState } from "react";
import { IOrderProps } from "../../../interface";
import OrderService from "../../../services/orderService";

const AdminOrders = () => {
  const [orders, setOrders] = useState<IOrderProps[]>([]);
  const [selectedVal, setSelectedVal] = useState<string>("Pending");
  const [loading, setLoading] = useState(false);

  const getAllOrders = useCallback(async (status: string) => {
    setLoading(true);
    const res = await OrderService.getAllOrders(status);
    setOrders(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    getAllOrders(selectedVal);
  }, [getAllOrders, selectedVal]);
  return (
    <>
      {loading && (
        <div className="loader-overlay visible">
          <div className="loader">Loading...</div>
        </div>
      )}
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
            <th>المستخدم</th>
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
              <th>{order.totalAmunt}</th>
              <th>{order.status}</th>
              <th>{order.userName}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminOrders;
