import { useCallback, useEffect, useState } from "react";
import ProductService from "../../services/productService";
import { IProductProps } from "../../interface";
import "./homeProducts.css";
import CartService from "../../services/cartService";
import { useCart } from "../../utils/CartProvider";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert/Alert";
const HomeProducts = ({ categoryId }: { categoryId: number | null }) => {
  // state
  const [products, setProducts] = useState<IProductProps[]>([]);
  const isLoggedIn = !!localStorage.getItem("authToken");
  const userData = localStorage.getItem("user")!;
  const [addedProducts, setAddedProducts] = useState<number[]>([]);
  const userTempId = isLoggedIn ? JSON.parse(userData).userId : null;
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const { setCartCount } = useCart();

  // Add Products To Card
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

  // Get Products id
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

  // GetAll Products in home page accourding to category
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

  useEffect(() => {
    if (userTempId) {
      fetchAddedProducts(userTempId);
    }
  }, [userTempId]);

  return (
    <div className="homeCardProducts">
      {products.length > 0 ? (
        products.map((product) => (
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
        ))
      ) : (
        <Alert type="info">
          <span>لا يوجد منتجات في هذا القسم</span>
        </Alert>
      )}
    </div>
  );
};

export default HomeProducts;
