import { useEffect, useState } from "react";
import OrderService from "../../services/orderService";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserService from "../../services/userServices";
import { useTranslation } from "react-i18next";

const CompleteOrder = () => {
  const userId = JSON.parse(localStorage.getItem("user")!).userId;
  const [shippingAddress, setAddress] = useState<string>("");
  const [phoneNumebr, setPhoneNumber] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [notes, setNots] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { shoppingCartId, fromSource } = location.state || {};
  const navigate = useNavigate();

  const getUserPhone = async (userId: string) => {
    try {
      const res = await UserService.getUserData(userId);
      setPhoneNumber(res.phoneNumber);
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
  };

  const { t }: { t: (key: string) => string } = useTranslation();

  const formHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await OrderService.addNewOrder(
        userId,
        shoppingCartId,
        shippingAddress,
        detailedAddress,
        notes,
        phoneNumebr
      );
      if (res?.status === 200) {
        navigate("/payment", {
          state: { fromSource: true, orderId: res.data.id },
        });
        console.log(res.data);
      }
    } catch (err: any) {
      toast(err.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserPhone(userId);
  }, [userId]);

  if (!fromSource) {
    return <Navigate to="/" />;
  }

  return (
    <div className="order-Form">
      <h4 style={{ textAlign: "center" }}>من فضلك اكمل البيانات</h4>
      <form onSubmit={formHandler}>
        <div className="form-group">
          <label>{t("address")}</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setAddress(e.target.value)}
            className="inputField"
            placeholder={t("address")}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("address")}</label>
          <input
            type="text"
            value={detailedAddress}
            onChange={(e) => setDetailedAddress(e.target.value)}
            className="inputField"
            placeholder={t("address")}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("address")}</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNots(e.target.value)}
            className="inputField"
            placeholder={t("address")}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("phone")}</label>
          <input
            type="text"
            value={phoneNumebr}
            // onChange={(e) => setPhoneNumber(e.target.value)}
            className="inputField"
            placeholder={t("phone")}
            required
            readOnly
          />
        </div>

        <div style={{ width: "200px", margin: "auto" }}>
          <button type="submit" className="btn submitBtn" disabled={loading}>
            {loading ? <i className="fa-solid fa-spinner"></i> : t("toPay")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteOrder;
