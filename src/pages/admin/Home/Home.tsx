import { Link } from "react-router-dom";
import "./home.css";
import { useEffect, useState } from "react";
import CategoryService from "../../../services/categoryService";
import ProductService from "../../../services/productService";
import BannerService from "../../../services/bannerService";
import OrderService from "../../../services/orderService";
const AdminHome = () => {
  const [categoryNumber, setCategoryNumber] = useState(0);
  const [productNumber, setProductNumber] = useState(0);
  const [bannerNumber, setBannerNumber] = useState(0);
  const [ordersNumber, setOrdersNumber] = useState(0);
  const numbers = async () => {
    const categories = await CategoryService.getAllCategories();
    setCategoryNumber(categories.length);
    const products = await ProductService.getAllProducts();
    setProductNumber(products.length);
    const banners = await BannerService.getAllBanners();
    setBannerNumber(banners.length);
    const orders = await OrderService.getAllOrders("Pending");
    setOrdersNumber(orders.length);
  };
  useEffect(() => {
    numbers();
  }, [categoryNumber, productNumber, bannerNumber]);
  return (
    <div className="homeCards">
      <div className="homeCard categories">
        <h1>{categoryNumber}</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/categories">أقسام</Link>
      </div>
      <div className="homeCard users">
        <h1>{ordersNumber}</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/orders">طلب</Link>
      </div>
      <div className="homeCard products">
        <h1>{productNumber}</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/products">منتج</Link>
      </div>
      <div className="homeCard photos">
        <h1>{bannerNumber}</h1>
        <i className="fa-solid fa-home fa-lg"></i>
        <Link to="/admin/banners">صور</Link>
      </div>
    </div>
  );
};

export default AdminHome;
