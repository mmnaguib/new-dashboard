import React, { Fragment, useCallback, useEffect, useState } from "react";
import { IOrderProps } from "../../../interface";
import OrderService from "../../../services/orderService";
import Alert from "../../../components/Alert/Alert";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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

  const deleteHandler = async (orderId: string) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        OrderService.cancelOrder(orderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
        toast.success("Order has been cancelled successfully!");
      }
    });
  };

  useEffect(() => {
    getAllOrders(selectedVal);
  }, [getAllOrders, selectedVal]);

  const updateStatus = async (orderId: string) => {
    OrderService.updateOrderStatus(orderId);
    setOrders((prevOrders: IOrderProps[]) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "paid" } : order
      )
    );
  };

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
                {selectedVal !== "Pending" && <th>الحالة</th>}
                <th>المستخدم</th>
                {selectedVal !== "Pending" && <th>cancel</th>}
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
                    {selectedVal !== "Pending" && (
                      <th>
                        <button onClick={() => updateStatus(order.orderId)}>
                          {order.status}
                        </button>
                      </th>
                    )}
                    <th>{order.userName}</th>
                    {selectedVal !== "Pending" && (
                      <th>
                        <button
                          className="delete actionsBtn"
                          onClick={() => deleteHandler(order.orderId)}
                          style={{ width: "fit-content" }}
                        >
                          Cancel
                        </button>
                      </th>
                    )}
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
