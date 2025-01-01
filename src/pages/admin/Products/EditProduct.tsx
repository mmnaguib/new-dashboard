import React, { useEffect, useState } from "react";
import {
  ICategoryProps,
  IEditPopupProps,
  IEditProductPopupProps,
  IProductProps,
} from "../../../interface";
import CategoryService from "../../../services/categoryService";
import { toast } from "react-toastify";
import ProductService from "../../../services/productService";

const EditProduct = ({
  productToEdit,
  openEdit,
  setOpenEdit,
  editID,
  editTitle,
  editDescription,
  editImage,
  setEditID,
  setEditTitle,
  setEditDescription,
  setEditImage,
  editPrice,
  setEditPrice,
  editQuantity,
  setEditQuantity,
  editCategory,
  setEditCategory,
  setProducts,
}: IEditProductPopupProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const getAllCatgories = async () => {
    const res = await CategoryService.getAllCategories();
    setCategories(res);
  };
  useEffect(() => {
    getAllCatgories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setEditImage(files[0]);
    }
  };

  const editProductHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    if (productToEdit?.id) {
      const res = await ProductService.updateProduct(
        editID,
        editTitle,
        editDescription,
        editPrice,
        editQuantity,
        editCategory,
        editImage
      );
      if (res?.status === 200) {
        setProducts((prevProducts: IProductProps[]) =>
          prevProducts.map((product) =>
            product.id === editID ? { ...product, ...res.data } : product
          )
        );
        toast.success("تم تعديل القسم بنجاح");
        setLoading(false);
        setOpenEdit(false);
        setEditTitle("");
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
            <form onSubmit={editProductHandler}>
              <div className="form-group">
                <label>اسم القسم</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
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
                  src={productToEdit?.image}
                  width={30}
                  height={30}
                  alt="category"
                />
              </div>
              <div className="form-group">
                <label>السعر</label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(+e.target.value)}
                  className="inputField"
                  placeholder="سعر المنتج"
                  required
                />
              </div>
              <div className="form-group">
                <label>الكمية</label>
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(+e.target.value)}
                  className="inputField"
                  placeholder="الكمية"
                  required
                />
              </div>

              <div className="form-group">
                <label>القسم</label>
                <select
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="inputField"
                >
                  <option selected>{editCategory}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button className="addCategoryBtn" disabled={loading}>
                  {loading ? <i className="fa-solid fa-spinner"></i> : "إضافة"}
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

export default EditProduct;
