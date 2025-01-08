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
  userId?: string;
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
  setCategories: React.Dispatch<React.SetStateAction<ICategoryProps[]>>;
}

export interface ICartProps {
  userId: string;
  cartId: number;
  totalPrice: number;
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface IOrderProps {
  orderId: string;
  userId: string;
  orderDate: string;
  totalAmount: number;
  shippingAddress: string;
  status: string;
  createdDate: string;
  contactNumber: string;
  userName: string;
  items: IOrderItem[];
  number: string;
  detailedAddress: string;
  notes: string;
}

export interface IOrderItem {
  productId: number;
  title: string;
  category: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IEditProductPopupProps {
  productToEdit: IProductProps | null;
  openEdit: boolean;
  setOpenEdit: (val: boolean) => void;
  editID: number;
  editTitle: string;
  editDescription: string;
  editImage: File | null;
  setEditID: (val: number) => void;
  setEditTitle: (val: string) => void;
  setEditDescription: (val: string) => void;
  setEditImage: (val: File | null) => void;
  editPrice: number;
  setEditPrice: (val: number) => void;
  editQuantity: number;
  setEditQuantity: (val: number) => void;
  editCategory: string;
  setEditCategory: (val: string) => void;
  setProducts: React.Dispatch<React.SetStateAction<IProductProps[]>>;
}

export interface ICoupon {
  name: string;
  code: string;
  discountType: number;
  discountValue: number;
  maxUsageCount: number;
  maxDiscountValue: number;
  startDate: Date;
  endDate: Date;
  bloggerId: number;
}

export interface IBlogger {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}
