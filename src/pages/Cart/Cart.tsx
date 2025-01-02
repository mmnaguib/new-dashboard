import React, { useEffect, useState } from "react";
import CartService from "../../services/cartService";
import { ICartProps } from "../../interface";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useCart } from "../../utils/CartProvider";
import Alert from "../../components/Alert/Alert";
import { useTranslation } from "react-i18next";
const Cart = () => {
  const userTempId = JSON.parse(localStorage.getItem("user")!).userId;
  const [cartProducts, setCartProducts] = useState<ICartProps | null>(null);
  const { setCartCount } = useCart();
  const [loading, setLoading] = useState(false);
  const { t }: { t: (key: string) => string } = useTranslation();

  const getCart = async (userId: string) => {
    setLoading(true);
    const res = await CartService.getUserCart(userId);
    setCartProducts(res);
    setLoading(false);
  };

  const deleteHandler = async (id: number) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await CartService.deleteItemFromQuantity(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setCartProducts((prev) => {
          if (!prev) return prev;
          const updatedItems = prev.items.filter((item) => item.id !== id);
          const updatedTotalPrice = updatedItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          return {
            ...prev,
            items: updatedItems,
            totalPrice: updatedTotalPrice,
          };
        });
        setCartCount((prev) => {
          const newCount = prev - 1;
          localStorage.setItem("cartCount", newCount.toString());
          return newCount;
        });
      }
    });
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    try {
      await CartService.updateItemQuantity(id, newQuantity);
      setCartProducts((prev) => {
        if (!prev) return prev;
        const updatedItems = prev.items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        const updatedTotalPrice = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return {
          ...prev,
          items: updatedItems,
          totalPrice: updatedTotalPrice,
        };
      });
    } catch (error) {
      Swal.fire(
        "Error!",
        "There was a problem updating the quantity.",
        "error"
      );
    }
  };

  const increaseQuantity = (id: number, quantity: number) => {
    updateQuantity(id, quantity + 1);
  };

  const decreaseQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      Swal.fire("Warning!", "Quantity cannot be less than 1.", "warning");
    }
  };

  useEffect(() => {
    getCart(userTempId);
  }, [userTempId]);
  return (
    <>
      {loading && (
        <div className="loader-overlay visible">
          <div className="loader">Loading...</div>
        </div>
      )}
      {cartProducts?.items.length ? (
        <>
          <table border={1} className="tableShow">
            <thead>
              <tr>
                <th>#</th>
                <th>{t("product")}</th>
                <th>{t("quantity")}</th>
                <th>{t("price")}</th>
                <th>{t("total")}</th>
                <th>{t("delete")}</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts &&
                cartProducts.items.map((item) => (
                  <tr key={item.id}>
                    <td>1</td>
                    <td>
                      {item.title}
                      <br />
                      <img src={item.image} alt="" width={50} height={50} />
                    </td>
                    <td>
                      <button
                        style={{ background: "#080" }}
                        className="actionsBtn"
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <b style={{ margin: "0 15px", fontSize: "20px" }}>
                        {item.quantity}
                      </b>
                      <button
                        style={{ background: "#2d5085" }}
                        className="actionsBtn"
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.price * item.quantity} $</td>
                    <td>
                      <button
                        className="delete actionsBtn"
                        onClick={() => deleteHandler(item.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="btnCartpurchase" style={{ margin: "0 15px" }}>
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>
              {t("Totalbillprice")} : {cartProducts?.totalPrice}{" "}
              {t("Egyptianpoundsonly")}
            </p>
            <Link
              onClick={() => localStorage.setItem("cartCount", "0")}
              to="/order"
              state={
                cartProducts?.cartId
                  ? { shoppingCartId: cartProducts.cartId, fromSource: true }
                  : {}
              }
              style={{
                padding: "10px 30px",
                border: "none",
                background: "#000",
                color: "#fff",
                width: "fit-content",
                fontWeight: "bold",
                borderRadius: "5px",
                textDecoration: "none",
                display: "inline-block",
                textAlign: "center",
              }}
              className="checkoutBtn"
            >
              {t("continuethepurchaseprocess")}
            </Link>
          </div>
        </>
      ) : (
        <div>
          <Alert type="info">
            <span>لا يوجد منتجات في السلة</span>
            <Link to="/" className="continueShopping">
              اكمل تسوق <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </Alert>
        </div>
      )}
    </>
  );
};

export default Cart;
