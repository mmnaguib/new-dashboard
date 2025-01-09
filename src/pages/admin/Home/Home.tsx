import { data, Link } from "react-router-dom";
import "./home.css";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
export interface IDashboard {
  cancelledOrders: number;
  deliveredOrders: number;
  lowStockProducts: number;
  paidOrders: number;
  pendingOrders: number;
  preparingOrders: number;
  shippedOrders: number;
  topCoupons: number;
  topSellingProducts: number;
  totalOrders: number;
}
const AdminHome = () => {
  const token = localStorage.getItem("authToken");
  const [data, setData] = useState<IDashboard>({
    cancelledOrders: 0,
    deliveredOrders: 0,
    lowStockProducts: 0,
    paidOrders: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    shippedOrders: 0,
    topCoupons: 0,
    topSellingProducts: 0,
    totalOrders: 0,
  });
  const numbers = useCallback(async () => {
    const dashboardData = await axiosInstance.get("Dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(dashboardData.data);
    console.log(dashboardData.data);
  }, [token]);
  useEffect(() => {
    numbers();
  }, [numbers]);
  return (
    <div className="homeCards">
      <div className="homeCard categories">
        <h1>5</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/categories">أقسام</Link>
      </div>
      <div className="homeCard users">
        <h1>{data.totalOrders}</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/orders">طلب</Link>
      </div>
      <div className="homeCard products">
        <h1>5</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/products">منتج</Link>
      </div>
      <div className="homeCard photos">
        <h1>5</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/banners">صور</Link>
      </div>
      <div className="homeCard photos">
        <h1>5</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/bloggers">المسوقين</Link>
      </div>
    </div>
  );
};

export default AdminHome;
