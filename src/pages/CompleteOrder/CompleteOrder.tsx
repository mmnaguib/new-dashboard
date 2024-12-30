import React, { useState } from "react";
import OrderService from "../../services/orderService";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompleteOrder = () => {
  const userId = JSON.parse(localStorage.getItem("user")!).userId;
  const [shippingAddress, setAddress] = useState<string>("");
  const [phoneNumebr, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { shoppingCartId, fromSource } = location.state || {};
  const navigate = useNavigate();
  if (!fromSource) {
    return <Navigate to="/" />;
  }
  const formHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await OrderService.addNewOrder(
        userId,
        shoppingCartId,
        shippingAddress,
        phoneNumebr
      );
      navigate("/payment");
    } catch (err: any) {
      return toast(err.response?.data);
    } finally {
      setLoading(false);
    }
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
            {loading ? <i className="fa-solid fa-spinner"></i> : "سجل الطلب"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteOrder;
