import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorHandler from "../components/error/ErrorHandle";
import Root from "../pages/Layout";
import Home from "../pages";
import AdminLayout from "../pages/admin/Layout/Layout";
import AdminHome from "../pages/admin/Home/Home";
import Login from "../pages/Login/Login";
import PageNotFound from "../pages/PageNotFound";
import AdminCategories from "../pages/admin/Categories/Categories";
import RegisterNewAdmin from "../pages/admin/RegisterNewAdmin/RegisterNewAdmin";
import AdminProducts from "../pages/admin/Products/Products";
import AdminBanners from "../pages/admin/Banners/Banners";
import Category from "../pages/Categories/Category";
import Cart from "../pages/Cart/Cart";
import AdminOrders from "../pages/admin/Orders/Orders";
import UserOrders from "../pages/UserOrders/UserOrders";
import CompleteOrder from "../pages/CompleteOrder/CompleteOrder";
import Payment from "../pages/Payment/Payment";
import UserRegister from "../pages/UserRegister/UserRegister";

const isLoggedIn = !!localStorage.getItem("authToken");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorHandler />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<CompleteOrder />} />
        <Route path="/my-orders" element={<UserOrders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/category/:id" element={<Category />} />
      </Route>

      <Route
        path={"/admin"}
        element={isLoggedIn ? <AdminLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<AdminHome />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="admin-register" element={<RegisterNewAdmin />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
export default router;
