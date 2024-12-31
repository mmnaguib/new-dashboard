import React, { useState } from "react";
import { toast } from "react-toastify";
import "./register.css";
import axiosInstance from "../../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
const RegisterNewAdmin = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const addNewAdmin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      toast.error("الرجاء إدخال كل البيانات ");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("الرقم السري غير متشابه ");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "Account/CreateAdminAccount",
        {
          email,
          firstName,
          password,
          lastName,
          phoneNumber,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setEmail("");
        setFirstName("");
        setPassword("");
        setLastName("");
        setPhone("");
        setConfirmPass("");
        toast.success("تم إضافة الادمن بنجاح ");
        navigate("/admin");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errors = err.response.data;
        Object.keys(errors).forEach((field) => {
          if (Array.isArray(errors[field])) {
            errors[field].forEach((msg: string) => toast.error(msg));
          } else {
            toast.error(`${errors[field]}`);
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div className="loader-overlay visible">
          <div className="loader">Loading...</div>
        </div>
      )}
      <div className="registrationForm">
        <h1>تسجيل أدمن جديد</h1>
        <form onSubmit={addNewAdmin}>
          <div className="formGroupContent">
            <div className="form-group">
              <label>البريد الالكتروني</label>
              <input
                type="email"
                placeholder=""
                className="inputField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>الاسم الاول</label>
              <input
                type="text"
                placeholder=""
                className="inputField"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="formGroupContent">
            <div className="form-group">
              <label>الاسم الاخير</label>
              <input
                type="text"
                placeholder=""
                className="inputField"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>رقم الهاتف</label>

              <input
                type="text"
                placeholder=""
                className="inputField"
                value={phoneNumber}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="formGroupContent">
            <div className="form-group">
              <label> كلمة المرور</label>
              <input
                type="password"
                placeholder=""
                className="inputField"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>اعادة كلمة السر</label>
              <input
                type="password"
                placeholder=""
                className="inputField"
                value={confirmPassword}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
            </div>
          </div>
          <div style={{ width: "300px", margin: "auto", height: "30px" }}>
            <button
              type="submit"
              className="btn submitBtn"
              disabled={loading}
              style={{ height: "50px !important" }}
            >
              {loading ? <i className="fa-solid fa-spinner"></i> : "تسجيل"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterNewAdmin;
