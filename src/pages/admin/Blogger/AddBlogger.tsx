import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { IBlogger } from "../../../interface";
const AddBlogger = ({
  setBloggers,
}: {
  setBloggers: React.Dispatch<React.SetStateAction<IBlogger[]>>;
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openNew, setOpenNew] = useState<boolean>(false);
  const token = localStorage.getItem("authToken");

  const addNewBlogger = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !name || !phoneNumber) {
      toast.error("الرجاء إدخال كل البيانات ");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "Blogger",
        {
          email,
          name,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setEmail("");
        setName("");
        setPhone("");
        toast.success("تم إضافة المسوق بنجاح ");
        setBloggers((prevBloggers: IBlogger[]) => [...prevBloggers, res.data]);
        navigate("/bloggers");
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
      <button onClick={() => setOpenNew(true)} className="addBtn">
        <i className="fa-solid fa-plus"></i>
      </button>
      {openNew && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={addNewBlogger}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="formGroupContent">
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

            <button className="closePopupBtn" onClick={() => setOpenNew(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBlogger;
