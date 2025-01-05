import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AddProduct from "./AddProduct";
import ProductService from "../../../services/productService";
import { IProductProps } from "../../../interface";
import EditProduct from "./EditProduct";
const AdminProducts = () => {
  const [products, setProducts] = useState<IProductProps[]>([]);
  const [productToEdit, setProductToEdit] = useState<IProductProps | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editName, setEditName] = useState<string>("");
  const [editID, setEditID] = useState<number>(0);
  const [editDescription, setEditDescription] = useState<string>("");
  const [editprice, setEditPrice] = useState<number>(0);
  const [editqunatity, setEditQunatity] = useState<number>(0);
  const [editCategory, setEditCategory] = useState<string>("");
  const [editImage, setEditImage] = useState<File | null>(null);

  const getAll = async () => {
    setLoading(true);
    const res = await ProductService.getAllProducts(1, 10);
    setProducts(res.items);
    setLoading(false);
  };

  const openEditPopup = (product: IProductProps) => {
    setProductToEdit(product);
    setEditID(product.id);
    setEditName(product.title);
    setEditDescription(product.description);
    setEditPrice(product.price);
    setEditQunatity(product.quantity);
    setEditCategory(product.category);
    setEditImage(null);
    setOpenEdit(true);
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
      <EditProduct
        productToEdit={productToEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        editID={editID}
        setEditID={setEditID}
        editTitle={editName}
        setEditTitle={setEditName}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editImage={editImage}
        setEditImage={setEditImage}
        editPrice={editprice}
        setEditPrice={setEditPrice}
        editQuantity={editqunatity}
        setEditQuantity={setEditQunatity}
        editCategory={editCategory}
        setEditCategory={setEditCategory}
        setProducts={setProducts}
      />
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
                <button
                  onClick={() => openEditPopup(product)}
                  className="edit actionsBtn"
                >
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
