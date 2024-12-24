import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategoryProps } from "../../interface";
import CategoryService from "../../services/categoryService";

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<ICategoryProps | null>(null);
  const fetchCategory = useCallback(async () => {
    const res = await CategoryService.getCategory(Number(id));
    setCategory(res);
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <div className="category">
      <div>
        <h1>{category?.name}</h1>
        <p>{category?.description}</p>
        <div className="products">
          {category?.products?.map((product) => (
            <div key={product.id} className="ProductCardInCategory">
              {product.title}
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: "60vh" }}>
        <img src={category?.image} alt={category?.name} height={"100%"} />
      </div>
    </div>
  );
};

export default Category;
