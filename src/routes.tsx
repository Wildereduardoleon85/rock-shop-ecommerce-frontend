import {
  CartPage,
  HomePage,
  LoginPage,
  OrderDetailsPage,
  PaymentPage,
  PlaceOrderPage,
  ProductPage,
  RegisterPage,
  ShippingPage,
} from './pages'
import { ROUTES } from './constants'

export const routes = {
  public: [
    {
      name: 'home',
      path: ROUTES.home,
      page: <HomePage />,
    },
    {
      name: 'cart',
      path: ROUTES.cart,
      page: <CartPage />,
    },
    {
      name: 'login',
      path: ROUTES.login,
      page: <LoginPage />,
    },
    {
      name: 'product',
      path: ROUTES.product,
      page: <ProductPage />,
    },
    {
      name: 'register',
      path: ROUTES.register,
      page: <RegisterPage />,
    },
  ],
  private: [
    {
      name: 'orderDetails',
      path: ROUTES.order,
      page: <OrderDetailsPage />,
    },
    {
      name: 'payment',
      path: ROUTES.payment,
      page: <PaymentPage />,
    },
    {
      name: 'placeOrder',
      path: ROUTES.placeOrder,
      page: <PlaceOrderPage />,
    },
    {
      name: 'shipping',
      path: ROUTES.shipping,
      page: <ShippingPage />,
    },
  ],
}