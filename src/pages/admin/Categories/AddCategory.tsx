import React, { useState } from "react";
import { toast } from "react-toastify";
import CategoryService from "../../../services/categoryService";
import { ICategoryProps } from "../../../interface";

const AddCategory = ({
  setCategories,
}: {
  setCategories: React.Dispatch<React.SetStateAction<ICategoryProps[]>>;
}) => {
  const [name, setCatName] = useState<string>("");
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const addCategoryHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const res = await CategoryService.addNewCategory(name, description, image);
    if (res?.status === 200) {
      toast.success("تمت اضافة القسم بنجاح");

      setCategories((prevCategories: ICategoryProps[]) => [
        ...prevCategories,
        res.data,
      ]);

      setLoading(false);
      setOpenNew(false);
      setCatName("");
      setDescription("");
      setImage(null);
    }

    setLoading(false);
  };
  return (
    <>
      <button onClick={() => setOpenNew(true)} className="addBtn">
        <i className="fa-solid fa-plus"></i>
      </button>
      {openNew && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={addCategoryHandler}>
              <div className="form-group">
                <label>اسم القسم</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setCatName(e.target.value)}
                  className="inputField"
                  placeholder="اسم القسم"
                  required
                />
              </div>
              <div className="form-group">
                <label>وصف القسم</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  required
                />
              </div>
              <div>
                <button className="addCategoryBtn" disabled={loading}>
                  {loading ? <i className="fa-solid fa-spinner"></i> : "إضافة"}
                </button>
              </div>
              <button
                className="closePopupBtn"
                onClick={() => setOpenNew(false)}
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

export default AddCategory;
