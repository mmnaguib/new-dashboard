export interface ILoginResponse {
  userId: string;
  name: string;
  username: string;
  email: string;
  token: string;
  expirationTokenDate: string;
  roles: string[];
}
export interface ICategoryProps {
  id: number;
  image: string;
  userId: string;
  products?: IProductProps[];
  name: string;
  description: string;
}
export interface IProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}
export interface IRegisterProps {}
export interface IBannerProps {
  id: number;
  image: string;
}

export interface IEditPopupProps {
  categoryToEdit: ICategoryProps | null;
  openEdit: boolean;
  setOpenEdit: (val: boolean) => void;
  editID: number;
  editName: string;
  editDescription: string;
  editImage: File | null;
  setEditID: (val: number) => void;
  setEditName: (val: string) => void;
  setEditDescription: (val: string) => void;
  setEditImage: (val: File | null) => void;
}
