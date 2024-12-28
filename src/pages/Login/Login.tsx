import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/AxiosInstance";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const formHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) {
      toast.error("الرجاء إدخال البريد الإلكتروني");
      return;
    }
    if (!password) {
      toast.error("الرجاء إدخال كلمة المرور");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("Account/login", {
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/");
        window.location.reload();
        toast.success("تم تسجيل الدخول بنجاح ");
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        setEmail("");
        setPassword("");
        toast.error("البريد الالكتروني او كلمة المرور غير صحيحة");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response && err.response.status === 400) {
          toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        } else {
          toast.error("حدث خطأ أثناء الاتصال بالخادم.");
        }
      } else {
        toast.error("حدث خطأ غير معروف.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="loginContainer">
      <div className="loginPage">
        <form onSubmit={formHandler}>
          <div className="form-group">
            <label>البريد الالكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputField"
              placeholder="البريد الالكتروني"
            />
          </div>
          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputField"
              placeholder="كلمة المرور"
            />
          </div>
          <button type="submit" className="btn submitBtn" disabled={loading}>
            {loading ? "loading" : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
