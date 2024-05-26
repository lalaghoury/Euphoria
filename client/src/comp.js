// Layouts
import UserProfileLayout from "./config/UserProfileLayout/UserProfileLayout";
import AdminLayout from "./config/AdminLayout/AdminLayout";
import MainLayout from "./config/MainLayout/MainLayout";

// Admin Part
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AllUsersList from "./admin/AllUsers/AllUsersList";
import AllProductsList from "./admin/AllProducts/AllProductsList";
import AllCategoriesList from "./admin/AllCategories/AllCategoriesList";
import AllOrdersList from "./admin/AllOrders/AllOrdersList";
import AddCategory from "./admin/AllCategories/AddCategory";
import AddProduct from "./admin/AllProducts/AddProduct";
import EditProduct from "./admin/EditProduct/EditProduct";
import AllDressStylesList from "./admin/AllDressStyles/AllDressStylesList";
import AddDressStyle from "./admin/AllDressStyles/AddDressStyle";
import OrderDetails from "./admin/AllOrders/OrderDetails";

// Pages
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import HomePage from "./pages/HomePage/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import MyOrders from "./pages/UserProfilePage/MyOrders";
import MyWishlist from "./pages/UserProfilePage/MyWishlist";
import MyInfo from "./pages/UserProfilePage/MyInfo";
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails";

// Routes
import PrivateRoute from "./Routes/Private";
import LoginSuccess from "./Routes/LoginSuccess";
import IsAdmin from "./Routes/IsAdmin";
import AlreadyLoggedInRoute from "./Routes/AlreadyLoggedIn";

// Components
import Header from "./components/Header/Header";
import Shop from "./components/Shop/Shop";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import OrderConfirmed from "./components/OrderConfirmed/OrderConfirmed";
import SearchPage from "./components/SearchPage/SearchPage";

// Error Page
import ErrorPage from "./components/ErrorPage/ErrorPage";

export {
  Header,
  SignUpPage,
  SignInPage,
  HomePage,
  ForgotPasswordPage,
  CategoryDetails,
  NewPasswordPage,
  PageNotFound,
  AdminDashboard,
  AdminLayout,
  AllUsersList,
  AllProductsList,
  AllCategoriesList,
  AllOrdersList,
  AddCategory,
  AddProduct,
  EditProduct,
  Shop,
  ProductDetails,
  CartPage,
  PrivateRoute,
  CheckoutPage,
  OrderConfirmed,
  UserProfileLayout,
  MyOrders,
  MyWishlist,
  MyInfo,
  SearchPage,
  LoginSuccess,
  AllDressStylesList,
  AddDressStyle,
  IsAdmin,
  AlreadyLoggedInRoute,
  MainLayout,
  ErrorPage,
  OrderDetails, 
};
