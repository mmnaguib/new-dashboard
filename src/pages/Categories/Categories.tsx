import { useEffect, useState } from "react";
import { ICategoryProps } from "../../interface";
import CategoryService from "../../services/categoryService";
import "./categories.css";
import { Link } from "react-router-dom";
const Categories = ({
  setSelectedCategoryId,
}: {
  setSelectedCategoryId: (id: number | null) => void;
}) => {
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const fetchCategories = async () => {
    const res = await CategoryService.getAllCategories();
    setCategories(res);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="showCategories">
      <div className="showCategory" onClick={() => setSelectedCategoryId(null)}>
        <i className="fa-solid fa-home"></i>
        <span>الكل</span>
      </div>
      {categories.map((category) => (
        <div
          className="showCategory"
          key={category.id}
          onClick={() => setSelectedCategoryId(category.id)}
        >
          <i className="fa-solid fa-home"></i>
          <span>{category.name}</span>

          <Link to={`/category/${category.id}`} title="اذهب الي القسم">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
