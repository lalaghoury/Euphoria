import React, { Suspense } from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h2>Loading...</h2>
    </div>
  );
};

// Lazy-loaded components

// Routes
const LazyPrivateRoute = React.lazy(() => import("./Routes/Private"));
const LazyIsAdmin = React.lazy(() => import("./Routes/IsAdmin"));
const LazyAlreadyLoggedInRoute = React.lazy(() =>
  import("./Routes/AlreadyLoggedIn")
);

// Admin Components
const LazyAdminDashboard = React.lazy(() =>
  import("./pages/AdminDashboard/AdminDashboard")
);
const LazyAllUsersList = React.lazy(() =>
  import("./admin/AllUsers/AllUsersList")
);
const LazyAllProductsList = React.lazy(() =>
  import("./admin/AllProducts/AllProductsList")
);
const LazyAllCategoriesList = React.lazy(() =>
  import("./admin/AllCategories/AllCategoriesList")
);
const LazyAllOrdersList = React.lazy(() =>
  import("./admin/AllOrders/AllOrdersList")
);
const LazyAddCategory = React.lazy(() =>
  import("./admin/AllCategories/AddCategory")
);
const LazyAddProduct = React.lazy(() =>
  import("./admin/AllProducts/AddProduct")
);
const LazyEditProduct = React.lazy(() =>
  import("./admin/EditProduct/EditProduct")
);
const LazyAllDressStylesList = React.lazy(() =>
  import("./admin/AllDressStyles/AllDressStylesList")
);
const LazyAddDressStyle = React.lazy(() =>
  import("./admin/AllDressStyles/AddDressStyle")
);

// Layouts
const LazyUserProfileLayout = React.lazy(() =>
  import("./config/UserProfileLayout/UserProfileLayout")
);
const LazyAdminLayout = React.lazy(() =>
  import("./config/AdminLayout/AdminLayout")
);
const LazyMainLayout = React.lazy(() =>
  import("./config/MainLayout/MainLayout")
);

const LazySignUpPage = React.lazy(() =>
  import("./pages/SignUpPage/SignUpPage")
);
const LazySignInPage = React.lazy(() =>
  import("./pages/SignInPage/SignInPage")
);
const LazyHomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const LazyForgotPasswordPage = React.lazy(() =>
  import("./pages/ForgotPasswordPage/ForgotPasswordPage")
);
const LazyNewPasswordPage = React.lazy(() =>
  import("./pages/NewPasswordPage/NewPasswordPage")
);
const LazyPageNotFound = React.lazy(() =>
  import("./pages/PageNotFound/PageNotFound")
);
const LazyShop = React.lazy(() => import("./components/Shop/Shop"));
const LazyProductDetails = React.lazy(() =>
  import("./components/ProductDetails/ProductDetails")
);
const LazyCartPage = React.lazy(() => import("./pages/CartPage/CartPage"));
const LazyCheckoutPage = React.lazy(() =>
  import("./pages/CheckoutPage/CheckoutPage")
);
const LazyMyOrders = React.lazy(() =>
  import("./pages/UserProfilePage/MyOrders")
);
const LazyMyWishlist = React.lazy(() =>
  import("./pages/UserProfilePage/MyWishlist")
);
const LazyMyInfo = React.lazy(() => import("./pages/UserProfilePage/MyInfo"));
const LazySearchPage = React.lazy(() =>
  import("./components/SearchPage/SearchPage")
);
const LazyOrderConfirmed = React.lazy(() =>
  import("./components/OrderConfirmed/OrderConfirmed")
);
const LazyLoginSuccess = React.lazy(() => import("./Routes/LoginSuccess"));

export const routes = [
  {
    path: "/",
    element: <LazyMainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyHomePage />
          </Suspense>
        ),
      },
      {
        path: "/auth/login/success",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyLoginSuccess />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyShop />
          </Suspense>
        ),
      },
      {
        path: "/product/:productId",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyProductDetails />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Loading />}>
            <LazySearchPage />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyPrivateRoute />
          </Suspense>
        ),
        children: [
          {
            path: "/forgot-password",
            element: (
              <Suspense fallback={<Loading />}>
                <LazyForgotPasswordPage />
              </Suspense>
            ),
          },
          {
            path: "/cart",
            element: (
              <Suspense fallback={<Loading />}>
                <LazyCartPage />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={<Loading />}>
                <LazyUserProfileLayout />
              </Suspense>
            ),
            children: [
              {
                path: "/profile/my-orders",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyMyOrders />
                  </Suspense>
                ),
              },
              {
                path: "/profile/my-wishlist",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyMyWishlist />
                  </Suspense>
                ),
              },
              {
                path: "/profile/my-info",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyMyInfo />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "/reset-password/:resetToken",
            element: (
              <Suspense fallback={<Loading />}>
                <LazyNewPasswordPage />
              </Suspense>
            ),
          },
          {
            path: "/checkout",
            element: (
              <Suspense fallback={<Loading />}>
                <LazyCheckoutPage />
              </Suspense>
            ),
          },
          {
            path: "/order-confirmed",
            element: (
              <Suspense fallback={<Loading />}>
                <LazyOrderConfirmed />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyIsAdmin />
          </Suspense>
        ),
        children: [
          {
            path: "/dashboard",
            element: <LazyAdminLayout />,
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAdminDashboard />
                  </Suspense>
                ),
              },
              {
                path: "orders/orders-list",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllOrdersList />
                  </Suspense>
                ),
              },
              {
                path: "orders/order-details/:id",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllOrdersList />
                  </Suspense>
                ),
              },
              {
                path: "orders/edit-order/:id",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllOrdersList />
                  </Suspense>
                ),
              },
              {
                path: "users/all-users-list",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllUsersList />
                  </Suspense>
                ),
              },
              {
                path: "users/add-user",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllUsersList />
                  </Suspense>
                ),
              },
              {
                path: "users/details/:id",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllUsersList />
                  </Suspense>
                ),
              },
              {
                path: "products/products-list",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllProductsList />
                  </Suspense>
                ),
              },
              {
                path: "products/add-product",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAddProduct />
                  </Suspense>
                ),
              },
              {
                path: "products/edit-product/:id",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyEditProduct />
                  </Suspense>
                ),
              },
              {
                path: "categories/categories-list",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllCategoriesList />
                  </Suspense>
                ),
              },
              {
                path: "categories/add-category",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAddCategory />
                  </Suspense>
                ),
              },
              {
                path: "dress-styles/dress-styles-list",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAllDressStylesList />
                  </Suspense>
                ),
              },
              {
                path: "dress-styles/add-dress-style",
                element: (
                  <Suspense fallback={<Loading />}>
                    <LazyAddDressStyle />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      {
        path: "/",
        element: <LazyAlreadyLoggedInRoute />,
        children: [
          {
            path: "/sign-up",
            element: (
              <Suspense fallback={<Loading />}>
                <LazySignUpPage />
              </Suspense>
            ),
          },
          {
            path: "/sign-in",
            element: (
              <Suspense fallback={<Loading />}>
                <LazySignInPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyPageNotFound />
          </Suspense>
        ),
      },
    ],
  },
];
