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
import RegisterNewAdmin from "../pages/admin/Register/RegisterNewAdmin";
import AdminProducts from "../pages/admin/Products/Products";
import AdminBanners from "../pages/admin/Banners/Banners";
import Category from "../pages/Categories/Category";

const isLoggedIn = !!localStorage.getItem("authToken");
console.log(isLoggedIn);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />} errorElement={<ErrorHandler />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
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
        <Route path="admin-register" element={<RegisterNewAdmin />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
export default router;
