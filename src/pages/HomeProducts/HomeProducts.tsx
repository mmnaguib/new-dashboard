import { useCallback, useEffect, useState } from "react";
import ProductService from "../../services/productService";
import { IProductProps } from "../../interface";
import "./homeProducts.css";
const HomeProducts = ({ categoryId }: { categoryId: number | null }) => {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const isLoggedIn = !!localStorage.getItem("authToken");
  const featchProducts = useCallback(async (id: number | null) => {
    let res;
    if (id) {
      res = await ProductService.getAllProductsAccourdingToCategory(id);
    } else {
      res = await ProductService.getAllProducts();
    }
    setProducts(res);
  }, []);

  useEffect(() => {
    featchProducts(categoryId);
  }, [featchProducts, categoryId]);
  return (
    <div className="homeCardProducts">
      {products.length > 0
        ? products.map((product) => (
            <div className="productCard" key={product.id}>
              <img
                src={product.image}
                alt=""
                width={"100%"}
                height={"213px"}
                className="cardImage"
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 className="cartTitle">{product.title}</h3>
                <span className="productquantity">
                  {product.quantity ? (
                    <span className="visible">متاح</span>
                  ) : (
                    <span className="not-visible">غير متاح</span>
                  )}
                </span>
              </div>
              <span className="productPrice">${product.price}</span>
              {/* <span className="productCategory">{product.category}</span> */}
              {isLoggedIn && (
                <button className="cartBtn">إضافة الي السلة</button>
              )}
            </div>
          ))
        : "No Products in this Category"}
    </div>
  );
};

export default HomeProducts;
