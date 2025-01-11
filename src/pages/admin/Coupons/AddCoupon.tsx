import React, { useCallback, useEffect, useState } from "react";
import { IBlogger, ICoupon } from "../../../interface";
import axiosInstance from "../../../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCoupon = ({
  setCoupons,
}: {
  setCoupons: React.Dispatch<React.SetStateAction<ICoupon[]>>;
}) => {
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [discountType, setDiscountType] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [bloggers, setBloggers] = useState<IBlogger[]>([]);
  const [bloggerId, setBloggerId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const getAllBloggers = useCallback(async () => {
    const bloggers = await axiosInstance.get("Blogger", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBloggers(bloggers.data);
  }, [token]);

  useEffect(() => {
    getAllBloggers();
  }, [getAllBloggers]);

  const addNewCoupon = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "Coupons",
        {
          name,
          code,
          discountType,
          discountValue,
          startDate,
          endDate,
          bloggerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setCode("");
        setName("");
        setDiscountType(0);
        setDiscountValue(0);
        toast.success("تم إضافة الكوبون بنجاح ");
        setCoupons((prevCoupons: ICoupon[]) => [...prevCoupons, res.data]);
        navigate("/admin/coupons");
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
      <button onClick={() => setOpenNew(true)} className="addBtn">
        <i className="fa-solid fa-plus"></i>
      </button>
      {openNew && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={addNewCoupon}>
              <div className="form-group">
                <label>اسم الكوبون</label>
                <input
                  type="text"
                  placeholder=""
                  className="inputField"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>الكود</label>
                <input
                  type="text"
                  placeholder=""
                  className="inputField"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>نوع الخصم</label>
                <select
                  onChange={(e) => setDiscountType(+e.target.value)}
                  className="inputField"
                >
                  <option value={0}>نسبة</option>
                  <option value={1}>قيمة</option>
                </select>
              </div>
              <div className="form-group">
                <label>قيمة الخصم</label>
                <input
                  type="number"
                  placeholder=""
                  className="inputField"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(+e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>تاريخ البداية</label>
                <input
                  type="datetime-local"
                  placeholder=""
                  className="inputField"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>تاريخ النهاية</label>
                <input
                  type="datetime-local"
                  placeholder=""
                  className="inputField"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>المسوق</label>
                <select
                  value={bloggerId || ""}
                  onChange={(e) => setBloggerId(+e.target.value)}
                  className="inputField"
                  required
                >
                  <option value="" disabled>
                    اختر
                  </option>
                  {bloggers.map((blogger) => (
                    <option key={blogger.id} value={blogger.id}>
                      {blogger.name}
                    </option>
                  ))}
                </select>
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

export default AddCoupon;
