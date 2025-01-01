import React, { Fragment, useCallback, useEffect, useState } from "react";
import { IOrderProps } from "../../../interface";
import OrderService from "../../../services/orderService";
import Alert from "../../../components/Alert/Alert";

const AdminOrders = () => {
  const [orders, setOrders] = useState<IOrderProps[]>([]);
  const [selectedVal, setSelectedVal] = useState<string>("Pending");
  const [loading, setLoading] = useState(false);

  const getAllOrders = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const res = await OrderService.getAllOrders(status);
      setOrders(Array.isArray(res) ? res : []);
    } catch (err) {
      return <Alert>لا يوجد هذا طلبات في هذا النوع</Alert>;
    }
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
      <ul className="orderStatus">
        <li className={selectedVal === "Pending" ? "active" : ""}>
          <input
            type="radio"
            onChange={() => setSelectedVal("Pending")}
            value={"Pending"}
            name="status"
          />{" "}
          Pending
        </li>
        <li className={selectedVal === "Paid" ? "active" : ""}>
          <input
            type="radio"
            onChange={() => setSelectedVal("Paid")}
            value={"Paid"}
            name="status"
          />{" "}
          Paid
        </li>
        <li className={selectedVal === "Preparing" ? "active" : ""}>
          <input
            type="radio"
            onChange={() => setSelectedVal("Preparing")}
            value={"Preparing"}
            name="status"
          />{" "}
          Preparing
        </li>
        <li className={selectedVal === "Cancelled" ? "active" : ""}>
          <input
            type="radio"
            onChange={() => setSelectedVal("Cancelled")}
            value={"Cancelled"}
            name="status"
          />{" "}
          Cancelled
        </li>
        <li className={selectedVal === "Shipped" ? "active" : ""}>
          <input
            type="radio"
            onChange={() => setSelectedVal("Shipped")}
            value={"Shipped"}
            name="status"
          />{" "}
          Shipped
        </li>
        <li className={selectedVal === "Received" ? "active" : ""}>
          <input
            type="radio"
            onChange={() => setSelectedVal("Received")}
            value={"Received"}
            name="status"
          />{" "}
          Received
        </li>
      </ul>
      {orders.length > 0 ? (
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
                <th>المستخدم</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((order, idx) => (
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
                    <th>{order.userName}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <Alert>لا يوجد هذا طلبات في هذا النوع</Alert>
      )}
    </>
  );
};

export default AdminOrders;
