import React, { useEffect, useState } from "react";
import CategoryService from "../../../services/categoryService";
import { ICategoryProps } from "../../../interface";
import Swal from "sweetalert2";
import "./categories.css";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const AdminCategories = () => {
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [categoryToEdit, setCategoryToEdit] = useState<ICategoryProps | null>(
    null
  );

  const [openEdit, setOpenEdit] = useState(false);

  const [editName, setEditName] = useState<string>("");
  const [editID, setEditID] = useState<number>(0);
  const [editDescription, setEditDescription] = useState<string>("");
  const [editImage, setEditImage] = useState<File | null>(null);

  const getAll = async () => {
    const res = await CategoryService.getAllCategories();
    setCategories(res);
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
        await CategoryService.deleteCategory(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      }
    });
  };
  const openEditPopup = (category: ICategoryProps) => {
    setCategoryToEdit(category);
    setEditID(category.id);
    setEditName(category.name);
    setEditDescription(category.description);
    setEditImage(null);
    setOpenEdit(true);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div>
      <AddCategory setCategories={setCategories} />
      <EditCategory
        categoryToEdit={categoryToEdit}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        editID={editID}
        setEditID={setEditID}
        editName={editName}
        setEditName={setEditName}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editImage={editImage}
        setEditImage={setEditImage}
        setCategories={setCategories}
      />
      <table border={1} className="tableShow">
        <thead>
          <tr>
            <th>#</th>
            <th>اسم المنتج</th>
            <th>الوصف</th>
            <th>الصورة</th>
            <th>العمليات</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category, index) => (
            <tr key={index}>
              <td>{++index}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <img src={category.image} alt="" width={50} height={50} />
              </td>
              <td>
                <button
                  onClick={() => openEditPopup(category)}
                  className="edit actionsBtn"
                >
                  <i className="fa-solid fa-edit"></i>
                </button>
                <button
                  onClick={() => deleteHandler(category.id)}
                  className="delete actionsBtn"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories;
