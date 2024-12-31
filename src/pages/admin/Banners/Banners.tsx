import { useEffect, useState } from "react";
import BannerService from "../../../services/bannerService";
import { IBannerProps } from "../../../interface";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const AdminBanners = () => {
  const [banners, setBanners] = useState<IBannerProps[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [addImage, setAddImage] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [editImagePopup, setEditImagePopup] = useState(false);
  // const [editImage, setEditImage] = useState<IBannerProps | null>(null);
  const getAll = async () => {
    const res = await BannerService.getAllBanners();
    setBanners(res);
  };

  useEffect(() => {
    getAll();
  }, []);

  // const openEditBannerPopup = (banner: IBannerProps) => {
  //   setEditImage(banner);
  //   setEditImagePopup(true);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const deleteHandler = async (id: number) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await BannerService.removeImage(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setBanners((prevBanners) =>
          prevBanners.filter((banner) => banner.id !== id)
        );
      }
    });
  };
  const addImageHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const res = await BannerService.addNewImage(image);
    if (res?.status === 200) {
      toast.success("تم اضافة الصورة بنجاح");
      setBanners((prevCategories: IBannerProps[]) => [
        ...prevCategories,
        res.data,
      ]);
    }

    setLoading(false);
    setAddImage(false);
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay visible">
          <div className="loader">Loading...</div>
        </div>
      )}
      {banners.length === 4 ? (
        "لقد تجاوزت الحد الاقصي من الصور لا تستطيع اضافة المزيد "
      ) : (
        <button onClick={() => setAddImage(true)} className="addBtn">
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
      {addImage && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={addImageHandler}>
              <div className="form-group">
                <label>صورة الواجهة</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="inputField"
                  required
                />
              </div>
              <div>
                <button className="addCategoryBtn" disabled={loading}>
                  {loading ? <i className="fa-solid fa-spinner"></i> : "إضافة"}
                </button>
              </div>
            </form>
            <button
              className="closePopupBtn"
              onClick={() => setAddImage(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* {editImagePopup && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={addImageHandler}>
              <div className="form-group">
                <label>صورة القسم</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="inputField"
                />
                <img src={editImage?.image} width={50} height={50} alt="" />
              </div>
              <div>
                <button className="addCategoryBtn" disabled={loading}>
                  {loading ? <i className="fa-solid fa-spinner"></i> : "إضافة"}
                </button>
              </div>
            </form>
            <button
              className="closePopupBtn"
              onClick={() => setEditImagePopup(false)}
            >
              X
            </button>
          </div>
        </div>
      )} */}
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>الصورة</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.id}>
              <td>{banner.id}</td>
              <td>
                <img src={banner.image} width={50} height={50} alt="" />
              </td>
              <td>
                {/* <button
                  onClick={() => openEditBannerPopup(banner)}
                  className="edit actionsBtn"
                >
                  <i className="fa-solid fa-edit"></i>
                </button> */}
                <button
                  onClick={() => deleteHandler(banner.id)}
                  className="delete actionsBtn"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminBanners;
