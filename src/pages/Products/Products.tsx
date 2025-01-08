import React, { Fragment, useEffect, useState } from "react";
import ProductService from "../../services/productService";
import { ICategoryProps, IProductProps } from "../../interface";
import Alert from "../../components/Alert/Alert";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/MoneyFormat";
import CategoryService from "../../services/categoryService";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [originalProducts, setOriginalProducts] = useState<IProductProps[]>([]);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    setLoading(true);
    const res = await ProductService.getAllProducts();
    setProducts(res.items);
    setOriginalProducts(res.items);
    setLoading(false);
  };

  const { t }: { t: (key: string) => string } = useTranslation();

  const getAllProductsByCategory = async (id: number) => {
    const res = await ProductService.getAllProductsAccourdingToCategory(id);
    setProducts(res.items);
    setOriginalProducts(res.items);
  };

  const getAllCategories = async () => {
    const res = await CategoryService.getAllCategories();
    setCategories(res);
  };

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (!searchValue.trim()) {
      setProducts(originalProducts);
    } else {
      const filteredProducts = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <div className="productsContent">
      <div className="productsSidebar">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="ابحث في المنتجات ..."
            value={search}
            onChange={handleSearch}
          />
          <button className="search-button">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="categoryInputs">
          <h5 style={{ margin: "0" }}>الاقسام</h5>
          <input
            type="radio"
            name="category"
            value="0"
            onChange={() => getAllProducts()}
          />{" "}
          {t("all")}
          <br />
          {categories.map((category) => (
            <Fragment key={category.id}>
              <input
                type="radio"
                name="category"
                value={category.id}
                onChange={() => getAllProductsByCategory(category.id)}
              />{" "}
              {category.name} <br />
            </Fragment>
          ))}
        </div>
        <hr />
        <div className="sortOptions">
          <h5 style={{ margin: "0" }}>الترتيب</h5>
          <input
            type="radio"
            onChange={() => handleSortChange("asc")}
            name="sort"
          />
          من الاقل الي الاعلي
          <br />
          <input
            type="radio"
            onChange={() => handleSortChange("desc")}
            name="sort"
          />
          من الاعلي الي الاقل
        </div>
      </div>
      <div className="showAllProducts">
        {loading ? (
          <div className="loader-overlay visible">
            <div className="loader">Loading...</div>
          </div>
        ) : Array.isArray(sortedProducts) && sortedProducts.length > 0 ? (
          <>
            {sortedProducts.map((product) => (
              <div className="productCard" key={product.id}>
                <div>
                  <img src={product.image} alt="" width={100} height={100} />
                </div>
                <div className="productData">
                  <Link
                    to={`/product/${product.id}`}
                    className="productCardTitle"
                  >
                    {product.title}
                  </Link>
                  <span>{formatPrice(product.price)}</span>
                  <span
                    style={
                      product.quantity > 0
                        ? { color: "#080" }
                        : { color: "#f00" }
                    }
                  >
                    {product.quantity > 0 ? "متاح" : "غير متاح"}
                  </span>
                  <span>{product.category}</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <Alert>
            <span>لا يوجد منتجات في هذا القسم</span>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Products;
