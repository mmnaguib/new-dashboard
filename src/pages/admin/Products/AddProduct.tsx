import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ICategoryProps } from "../../../interface";
import ProductService from "../../../services/productService";
import CategoryService from "../../../services/categoryService";

const AddProduct = () => {
  const [title, setTitle] = useState<string>("");
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [qunatity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const addProductHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ProductService.addNewProduct(
        title,
        description,
        image,
        price,
        qunatity,
        categoryId
      );
      window.location.reload();
      toast.success("تمت اضافة القسم بنجاح");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setOpenNew(false);
      setTitle("");
      setDescription("");
      setPrice(0);
      setQuantity(0);
      setImage(null);
    }
  };

  const getAllCatgories = async () => {
    const res = await CategoryService.getAllCategories();
    setCategories(res);
  };
  useEffect(() => {
    getAllCatgories();
  }, []);
  return (
    <>
      <button onClick={() => setOpenNew(true)} className="addBtn">
        <i className="fa-solid fa-plus"></i>
      </button>
      {openNew && (
        <div className="addCategoryPopup">
          <div className="popupContent">
            <form onSubmit={addProductHandler}>
              <div className="form-group">
                <label>اسم القسم</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                />
              </div>
              <div className="form-group">
                <label>صورة القسم</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="inputField"
                />
              </div>
              <div className="form-group">
                <label>السعر</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  className="inputField"
                  placeholder="سعر المنتج"
                />
              </div>
              <div className="form-group">
                <label>الكمية</label>
                <input
                  type="number"
                  value={qunatity}
                  onChange={(e) => setQuantity(+e.target.value)}
                  className="inputField"
                  placeholder="الكمية"
                />
              </div>
              <div className="form-group">
                <label>الكمية</label>
                <select
                  onChange={(e) => setCategoryId(+e.target.value)}
                  className="inputField"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {categoryId}
              </div>
              <div>
                <button className="addCategoryBtn" disabled={loading}>
                  {loading ? "loading" : "إضافة"}
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

export default AddProduct;
