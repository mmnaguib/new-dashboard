import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddProduct from "./AddProduct";
import ProductService from "../../../services/productService";
import { IProductProps } from "../../../interface";
const AdminProducts = () => {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [loading, setLoading] = useState(false);

  const getAll = async () => {
    setLoading(true);
    const res = await ProductService.getAllProducts();
    setProducts(res);
    setLoading(false);
  };

  useEffect(() => {
    getAll();
  }, []);
  const deleteHandler = async (id: number) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        await ProductService.deleteProduct(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      }
    });
  };
  return (
    <>
      {loading && (
        <div className="loader-overlay visible">
          <div className="loader">Loading...</div>
        </div>
      )}
      <AddProduct setProducts={setProducts} />
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>اسم المنتج</th>
            <th>الوصف</th>
            <th>السعر</th>
            <th>الكمية المتاحة</th>
            <th>القسم</th>
            <th>الصورة</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, index) => (
            <tr key={product.id}>
              <td>{++index}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <img src={product.image} alt="" width={50} height={50} />
              </td>
              <td>
                <button className="edit actionsBtn">
                  <i className="fa-solid fa-edit"></i>
                </button>
                <button
                  onClick={() => deleteHandler(product.id)}
                  className="delete actionsBtn"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminProducts;
