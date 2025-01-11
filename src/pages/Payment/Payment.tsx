import { Fragment, useEffect, useState } from "react";
import OrderService from "../../services/orderService";
import { IOrderProps } from "../../interface";
import "./Payment.css";
import { Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PaymentService from "../../services/paymentService";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const { fromSource, orderId } = location.state || {};
  const [order, setOrder] = useState<IOrderProps | null>(null);
  const [coupon, setCoupon] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const { t }: { t: (key: string) => string } = useTranslation();

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
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //   }
  // };

  useEffect(() => {
    getOrderDetails(orderId);
  }, [orderId]);

  if (!fromSource) {
    return <Navigate to="/" />;
  }

  // useEffect(() => {
  //   if (order && order.totalAmount) {
  //     const totalPrice = Number(order.totalAmount);
  //     initialPayment(totalPrice, "EGP");
  //   }
  // }, [order]);

  const AddCouponToInvoice = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const res = await OrderService.addDiscount(orderId, code);
    setCoupon(false);
    window.location.reload();
    toast.success(res.message);
  };

  return (
    <>
      <div className="invoiceReport">
        <h1>Tia Store</h1>
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
            <span>الاجمالي</span>
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
                <div>{item.totalPrice}</div>
              </Fragment>
            ))}
            <div className="total-price">
              السعر الاجمالي للفاتورة :{" "}
              <span style={{ textDecoration: "line-through" }}>
                {order?.totalAmount}
              </span>{" "}
              جنيه لا غير
              <br />
              <span>{order?.netPrice}</span>
            </div>
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
      <button onClick={() => setCoupon(true)}>add</button>
      {coupon && (
        <div>
          <form onSubmit={AddCouponToInvoice}>
            <div className="form-group">
              <label>{t("address")}</label>
              <input
                type="text"
                value={orderId}
                className="inputField"
                placeholder={t("address")}
                required
                readOnly
              />
            </div>

            <div className="form-group">
              <label>{t("address")}</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="inputField"
                placeholder={t("address")}
                required
              />
            </div>
            <button type="submit">coupon</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Payment;
