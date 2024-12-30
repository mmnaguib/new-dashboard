import React, { useState } from "react";
import { toast } from "react-toastify";
import "./register.css";
import axiosInstance from "../../../utils/AxiosInstance";
const RegisterNewAdmin = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
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
      await axiosInstance.post(
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
      setEmail("");
      setFirstName("");
      setPassword("");
      setLastName("");
      setPhone("");
      setConfirmPass("");
      toast.success("تم إضافة الادمن بنجاح ");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
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
            {loading ? "loading" : "تسجيل الدخول"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterNewAdmin;
