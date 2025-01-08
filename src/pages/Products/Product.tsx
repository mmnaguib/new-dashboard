import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/productService";
import { IProductProps } from "../../interface";
import { formatPrice } from "../../utils/MoneyFormat";
import CartService from "../../services/cartService";
import { useCart } from "../../utils/CartProvider";

const Product = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<IProductProps | null>(null);
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [isPageLoading, setIsPageLoading] = useState(false); // Added loading for pages
  const [addedProducts, setAddedProducts] = useState<number[]>([]);
  const { setCartCount } = useCart();
  const isLoggedIn = !!localStorage.getItem("authToken");
  const userData = localStorage.getItem("user")!;
  const userTempId = isLoggedIn ? JSON.parse(userData).userId : null;

  const productDataFunc = useCallback(async (id: number) => {
    const res = await ProductService.getProduct(id);
    setProductData(res);
  }, []);

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

  useEffect(() => {
    productDataFunc(Number(id));
  }, [productDataFunc, id]);

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        alignItems: "center",
      }}
    >
      <div style={{ width: "50%", height: "80vh" }}>
        <img src={productData?.image} alt="" width={"100%"} height={"100%"} />
      </div>
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <h1>{productData?.title}</h1>
        <p>{productData?.description}</p>
        <span>{formatPrice(productData?.price || 0)}</span>
        <br />
        <span>{productData?.quantity}</span>
        <br />
        <button
          onClick={() => addToCart(userTempId, Number(productData?.id), 1)}
          className="cartBtn"
          disabled={!!loading[Number(productData?.id)]}
        >
          {!loading[Number(productData?.id)] ? (
            <>
              <i className="fa-solid fa-cart-plus"></i> إضافة إلى السلة
            </>
          ) : (
            <i className="fa-solid fa-spinner fa-spin"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Product;
