import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ICategoryProps } from "../../interface";
import CategoryService from "../../services/categoryService";

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<ICategoryProps | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchCategory = useCallback(async () => {
    setLoading(true);
    const res = await CategoryService.getCategory(Number(id));
    setCategory(res);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return loading ? (
    <>
      <div className="loader-overlay visible">
        <div className="loader">Loading...</div>
      </div>{" "}
    </>
  ) : (
    <div className="category">
      <div className="catData">
        <img src={category?.image} alt="" width={200} height={200} />
        <h1>{category?.name}</h1>
        <p>{category?.description}</p>
      </div>
      <div className="cat-products">
        {category?.products?.map((product) => (
          <div key={product.id} className="ProductCardInCategory">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={`http://safia.runasp.net/` + product.image}
                alt=""
                width={60}
                height={60}
              />
              <br />
              <b>{product.title}</b>
            </div>
            <span className="productPrice" style={{ top: 0, left: 0 }}>
              ${product.price}
            </span>
            <Link to={`/product/${product.id}`} className="btnDetails">
              تفاصيل
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
