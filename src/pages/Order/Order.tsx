import React, { useState } from "react";
import OrderService from "../../services/orderService";
import { useLocation } from "react-router-dom";

const Order = () => {
  const userId = JSON.parse(localStorage.getItem("user")!).userId;
  const [shippingAddress, setAddress] = useState<string>("");
  const [phoneNumebr, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const shoppingCartId = location.state?.cartId;
  const formHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await OrderService.addNewOrder(
      userId,
      shoppingCartId,
      shippingAddress,
      phoneNumebr
    );
  };
  return (
    <div className="order-Form">
      <h4 style={{ textAlign: "center" }}>من فضلك اكمل البيانات</h4>
      <form onSubmit={formHandler}>
        <div className="form-group">
          <label>العنوان</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setAddress(e.target.value)}
            className="inputField"
            placeholder="العنوان"
            required
          />
        </div>
        <div className="form-group">
          <label>الهاتف</label>
          <input
            type="text"
            value={phoneNumebr}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="inputField"
            placeholder="رقم الهاتف"
            required
          />
        </div>

        <div style={{ width: "200px", margin: "auto" }}>
          <button type="submit" className="btn submitBtn" disabled={loading}>
            {loading ? "loading" : "تسجيل الدخول"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Order;
