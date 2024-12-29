import React, { useEffect, useState } from "react";
import CartService from "../../services/cartService";
import { ICartProps } from "../../interface";

const Cart = () => {
  const userTempId = JSON.parse(localStorage.getItem("user")!).userId;
  const [cartProducts, setCartProducts] = useState<ICartProps | null>(null);
  const getCart = async (userId: string) => {
    const res = await CartService.getUserCart(userId);
    setCartProducts(res);
  };

  useEffect(() => {
    getCart(userTempId);
  }, []);
  return (
    <>
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>اسم المنتج</th>
            <th>الصورة</th>
            <th>الكمية</th>
            <th>السعر</th>
            <th>الاجمالي</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts &&
            cartProducts.items.map((product) => (
              <tr key={product.id}>
                <td>1</td>
                <td>{product.title}</td>
                <td>
                  <img src={product.image} alt="" width={50} height={50} />
                </td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.price * product.quantity}</td>
                <td>
                  <button>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>إجمالي سعر الفاتورة : {cartProducts?.totalPrice} جنيه مصري لا غير</p>
    </>
  );
};

export default Cart;
