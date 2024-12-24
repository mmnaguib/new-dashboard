import { useEffect, useState } from "react";
import { ICategoryProps } from "../../interface";
import CategoryService from "../../services/categoryService";
import "./categories.css";
const Categories = ({
  setSelectedCategoryId,
}: {
  setSelectedCategoryId: (id: number) => void;
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
      {categories.map((category, index) => (
        <div
          className="showCategory"
          key={category.id}
          onClick={() => setSelectedCategoryId(category.id)}
        >
          <i className="fa-solid fa-home"></i>
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
