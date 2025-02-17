import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <i className="fa-solid fa-home"></i>
          <Link to="/admin">الصفحة الرئيسية</Link>
        </li>
        <li>
          <i className="fa-solid fa-home"></i>
          <Link to="/admin/categories">الأقسام</Link>
        </li>
        <li>
          <i className="fa-solid fa-home"></i>
          <Link to="/admin/products">المنتجات</Link>
        </li>
        <li>
          <i className="fa-solid fa-address-card"></i>
          <Link to="/admin/banners">الصور الرئيسية</Link>
        </li>
        <li>
          <i className="fa-solid fa-users"></i>
          <Link to="/admin/admin-register">اضافة أدمن جديد</Link>
        </li>
        <li>
          <i className="fa-solid fa-users"></i>
          <Link to="/admin/bloggers">المسوقين</Link>
        </li>
        <li>
          <i className="fa-solid fa-id-card"></i>
          <Link to="/admin/coupons">كوبونات</Link>
        </li>
      </ul>
    </div>
  );
};
