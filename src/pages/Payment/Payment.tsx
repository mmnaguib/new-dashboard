import { Fragment, useEffect, useState } from "react";
import OrderService from "../../services/orderService";
import { IOrderProps } from "../../interface";
import { useLocation } from "react-router-dom";
import PaymentService from "../../services/paymentService";
import "./Payment.css";
const Payment = () => {
  const [order, setOrder] = useState<IOrderProps | null>(null);
  const location = useLocation();

  const getOrderDetails = async (orderId: string) => {
    try {
      const orderDetail = await OrderService.getUserOrder(orderId);
      setOrder(orderDetail);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // const initialPayment = async (
  //   totalPrice: number,
  //   currenct: string = "EGP"
  // ) => {
  //   try {
  //     const res = await PaymentService.InitiatePayment(totalPrice, currenct);
  //     console.log(res);
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //   }
  // };

  useEffect(() => {
    const orderId = "c93e3d2c-cd13-487b-8d08-a401c04f6456"; // يمكن تمرير هذا عبر state من location
    getOrderDetails(orderId);
  }, []);

  // useEffect(() => {
  //   if (order && order.totalAmount) {
  //     const totalPrice = Number(order.totalAmount);
  //     initialPayment(totalPrice, "EGP");
  //   }
  // }, [order]);

  return (
    <>
      <div className="invoiceReport">
        <h1>Rohiem Store</h1>
        <span className="aboveTable">اسم العميل : {order?.userName}</span>
        <br />
        <span className="aboveTable">
          تاريخ الطلب : {order?.orderDate.slice(0, 10)}
        </span>
        <br />
        <span className="aboveTable">رقم الطلب : {order?.orderId}</span>
        <br />
        <span className="aboveTable">
          عنوان العميل : {order?.shippingAddress}
        </span>
        <br />
        <span className="aboveTable">
          رقم موبايل العميل : {order?.contactNumber}
        </span>
        <br />
        <div className="order-grid">
          <div className="grid-header">
            <span>#</span>
            <span>المنتج</span>
            <span>الكمية</span>
            <span>السعر</span>
          </div>
          <div className="grid-body">
            {order?.items.map((item, idx) => (
              <Fragment key={idx}>
                <div>{idx + 1}</div>
                <div>
                  {item.title}{" "}
                  {/* <img src={item.image} alt="" width={30} height={30} /> */}
                </div>
                <div>{item.quantity}</div>
                <div>{item.unitPrice}</div>
                <div className="total-price">
                  السعر الاجمالي للفاتورة : <span>{item.totalPrice}</span> جنيه
                  لا غير
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <ul className="ownerConnection">
          <li>
            <i className="fa-brands fa-whatsapp fa-lg"></i> 01275830217
          </li>
          <li>
            <i className="fa-solid fa-envelope fa-lg"></i> mnaguib126@gmail.com
          </li>
          <li>
            <i className="fa-solid fa-location-arrow fa-lg"></i> Somosta
          </li>
        </ul>
      </div>
    </>
  );
};

export default Payment;
