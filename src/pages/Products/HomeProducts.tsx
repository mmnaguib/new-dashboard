import { useCallback, useEffect, useState } from "react";
import ProductService from "../../services/productService";
import { IProductProps } from "../../interface";
import "./homeProducts.css";
import CartService from "../../services/cartService";
import { useCart } from "../../utils/CartProvider";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
import FavoriteButton from "../../components/FavButton";
const HomeProducts = ({ categoryId }: { categoryId: number | null }) => {
  // state
  const [products, setProducts] = useState<IProductProps[]>([]);
  const isLoggedIn = !!localStorage.getItem("authToken");
  const userData = localStorage.getItem("user")!;
  const [addedProducts, setAddedProducts] = useState<number[]>([]);
  const userTempId = isLoggedIn ? JSON.parse(userData).userId : null;
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [isPageLoading, setIsPageLoading] = useState(false); // Added loading for pages
  const { setCartCount } = useCart();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(1);

  const addToCart = async (
    userId: string,
    productId: number,
    quantity: number
  ) => {
    setLoading((prev) => ({ ...prev, [productId]: true }));
    if (!userId) return;
    await CartService.addProductToCart(userId, productId, quantity);
    setAddedProducts((prev) => [...prev, productId]);
    setCartCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("cartCount", newCount.toString());
      return newCount;
    });
    setLoading((prev) => ({ ...prev, [productId]: false }));
  };

  const fetchAddedProducts = async (userId: string) => {
    if (!userId) return;
    try {
      const cart = await CartService.getUserCart(userId);
      const addedProductIds = cart.items.map((item: IProductProps) => item.id);
      setAddedProducts(addedProductIds);
    } catch (error) {
      console.error("Error fetching added products:", error);
    }
  };

  const featchProducts = useCallback(
    async (id: number | null, page: number = 1, size: number = 10) => {
      setIsPageLoading(true); // Start page loading
      let res;
      try {
        if (id) {
          res = await ProductService.getAllProductsAccourdingToCategory(
            id,
            page,
            size
          );
        } else {
          res = await ProductService.getAllProducts(page, size);
        }
        setProducts(res.items);
        setTotal(res.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsPageLoading(false); // End page loading
      }
    },
    []
  );

  useEffect(() => {
    featchProducts(categoryId, page, size);
  }, [featchProducts, categoryId, page, size]);

  useEffect(() => {
    if (userTempId) {
      fetchAddedProducts(userTempId);
    }
  }, [userTempId]);

  return (
    <div className="homeCardProducts">
      {isPageLoading ? (
        <div className="loader-overlay visible">
          <div className="loader">Loading...</div>
        </div>
      ) : Array.isArray(products) && products.length > 0 ? (
        <>
          {products.map((product) => (
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
              {product.category}
              <span className="productPrice">${product.price}</span>
              <FavoriteButton productId={product.id} />
              {isLoggedIn && (
                <>
                  {addedProducts.includes(product.id) ? (
                    <Link
                      to="/cart"
                      className="cartBtn added"
                      style={{
                        display: "inline-block",
                        textDecoration: "none",
                        textAlign: "center",
                        lineHeight: "38px",
                      }}
                    >
                      <i className="fa-solid fa-check"></i> اذهب الي السلة
                    </Link>
                  ) : (
                    <button
                      onClick={() => addToCart(userTempId, product.id, 1)}
                      className="cartBtn"
                      disabled={!!loading[product.id]}
                    >
                      {!loading[product.id] ? (
                        <>
                          <i className="fa-solid fa-cart-plus"></i> إضافة إلى
                          السلة
                        </>
                      ) : (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          <Alert>
            <span>لا يوجد منتجات في هذا القسم</span>
          </Alert>
        </>
      )}
      {Array.isArray(products) && products.length > 0 && (
        <>
          <div style={{ position: "absolute", bottom: "-40px" }}>
            <select onChange={(e) => setSize(+e.target.value)}>
              <option value={5}>5</option>
              <option value={10} selected>
                10
              </option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            {Array.from({ length: total }, (_, index) => index + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  disabled={pageNum === page}
                  style={{
                    margin: "0 5px",
                    padding: "5px 10px",
                    backgroundColor: pageNum === page ? "#007bff" : "#f8f9fa",
                    color: pageNum === page ? "#fff" : "#000",
                    border: "1px solid #007bff",
                    cursor: pageNum === page ? "default" : "pointer",
                  }}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeProducts;
