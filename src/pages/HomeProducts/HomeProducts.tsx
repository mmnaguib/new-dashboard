import { useCallback, useEffect, useState } from "react";
import ProductService from "../../services/productService";
import { IProductProps } from "../../interface";
import "./homeProducts.css";
const HomeProducts = ({ categoryId }: { categoryId: number | null }) => {
  const [products, setProducts] = useState<IProductProps[]>([]);
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
              <h2>{product.title}</h2>
              <span>${product.price}</span>
              <span>{product.quantity}</span>
              <span>{product.category}</span>
              <img src={product.image} alt="" width={50} height={50} />
            </div>
          ))
        : "No Products in this Category"}
    </div>
  );
};

export default HomeProducts;
