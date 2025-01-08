import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ICategoryProps, IProductProps } from "../../../interface";
import ProductService from "../../../services/productService";
import CategoryService from "../../../services/categoryService";

const AddProduct = ({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<IProductProps[]>>;
}) => {
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
    const res = await ProductService.addNewProduct(
      title,
      description,
      image,
      price,
      qunatity,
      categoryId
    );
    if (res?.status === 200) {
      toast.success("تمت اضافة القسم بنجاح");
      setProducts((prevProducts: IProductProps[]) => [
        ...prevProducts,
        res.data,
      ]);
      setLoading(false);
      setOpenNew(false);
      setTitle("");
      setDescription("");
      setPrice(0);
      setQuantity(0);
      setImage(null);
    }
    setLoading(false);
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
              <div className="form-group">
                <label>السعر</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                  className="inputField"
                  placeholder="سعر المنتج"
                  required
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
                  required
                />
              </div>
              <div className="form-group">
                <label>القسم</label>
                <select
                  value={categoryId || ""}
                  onChange={(e) => setCategoryId(+e.target.value)}
                  className="inputField"
                  required
                >
                  <option value="" disabled>
                    اختر
                  </option>
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
