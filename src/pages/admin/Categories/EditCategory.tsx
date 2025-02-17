import React, { useState } from "react";
import CategoryService from "../../../services/categoryService";
import { ICategoryProps, IEditPopupProps } from "../../../interface";
import { toast } from "react-toastify";

const EditCategory = ({
  categoryToEdit,
  openEdit,
  setOpenEdit,
  editID,
  editName,
  editDescription,
  editImage,
  setEditID,
  setEditName,
  setEditDescription,
  setEditImage,
  setCategories,
}: IEditPopupProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setEditImage(files[0]);
    }
  };

  const editCategoryHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (categoryToEdit?.id) {
      const res = await CategoryService.updateCategory(
        editID,
        editName,
        editDescription,
        editImage
      );
      if (res?.status === 200) {
        setCategories((prevCategories: ICategoryProps[]) =>
          prevCategories.map((category) =>
            category.id === editID ? { ...category, ...res.data } : category
          )
        );
        toast.success("تم تعديل القسم بنجاح");
        setLoading(false);
        setOpenEdit(false);
        setEditName("");
        setEditDescription("");
        setEditImage(null);
      }
    } else {
      toast.error("No exist id");
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay visible">
          <div className="loader">Loading...</div>
        </div>
      )}
      {openEdit && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={editCategoryHandler}>
              <div className="form-group">
                {editID}
                <label>اسم القسم</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="inputField"
                  placeholder="اسم القسم"
                  required
                />
              </div>
              <div className="form-group">
                <label>وصف القسم</label>
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="inputField"
                  placeholder="اسم القسم"
                  required
                />
              </div>
              <div className="form-group">
                <label>صورة القسم</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="inputField"
                />
                <img
                  src={categoryToEdit?.image}
                  width={30}
                  height={30}
                  alt="category"
                />
              </div>
              <div>
                <button className="addCategoryBtn" disabled={loading}>
                  {loading ? <i className="fa-solid fa-spinner"></i> : "تعديل"}
                </button>
              </div>
              <button
                className="closePopupBtn"
                onClick={() => setOpenEdit(false)}
              >
                X
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategory;
