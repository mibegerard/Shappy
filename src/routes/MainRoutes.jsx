import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
const Home = Loadable(lazy(() => import('views/pages/home')));
const ProducteurAccueil = Loadable(lazy(() => import('views/pages/ProducteurAccueil')));
const RestaurateurAccueil = Loadable(lazy(() => import('views/pages/restaurateurAccueil')));
const DeposerPotager = Loadable(lazy(() => import('views/pages/DeposerPotager')));
const PreviewProduct = Loadable(lazy(() => import('views/pages/preview')));
const Cart = Loadable(lazy(() => import('views/pages/cart')));
const Checkout = Loadable(lazy(() => import('views/pages/checkout')));
const Account = Loadable(lazy(() => import('views/pages/account')));
const MonMarche = Loadable(lazy(() => import('views/pages/monMarche')));
const ProductDetail = Loadable(lazy(() => import('ui-component/marche/ProductDetail')));
const RestaurateurEdit = Loadable(lazy(() => import('views/pages/profile/RestaurateurProfileUpdate')));
const ProducteurEdit = Loadable(lazy(() => import('views/pages/profile/ProducteurProfileUpdate')));
const ProducteurProductDetail = Loadable(lazy(() => import('ui-component/account/ProductDetail')));
const ProducteurAllProducts = Loadable(lazy(() => import('ui-component/account/ProducteurAllProducts')));
const VerifyEmail = Loadable(lazy(() => import('views/pages/authentification/authforms/VerifyEmail')));
const CheckoutForm = Loadable(lazy(() => import('ui-component/checkout/CheckoutForm')));
const Return = Loadable(lazy(() => import('ui-component/checkout/Return')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/je-suis-producteur',
      element: <ProducteurAccueil />
    },
    {
      path: '/restaurateur',
      element: <RestaurateurAccueil />
    },
    {
      path: '/je-depose-mon-potager',
      element: <DeposerPotager />
    },
    {
      path: '/product-review',
      element: <PreviewProduct />
    },
    {
      path: '/mon-marche',
      element: <MonMarche />
    },
    {
      path: '/product/:productId',
      element: <ProductDetail />
    },
    {
      path: '/profile-producteur/product/:productId',
      element: <ProducteurProductDetail />
    },
    {
      path: '/auth/verify-email',
      element: <VerifyEmail />
    },
    {
      path: '/cart',
      element: <Cart />
    },
    {
      path: '/account',
      element: <Account />
    },
    {
      path: '/edit-profile/restaurateur',
      element: <RestaurateurEdit />
    },
    {
      path: '/edit-profile/producteur',
      element: <ProducteurEdit />
    },
    {
      path: '/producteur/products',
      element: <ProducteurAllProducts />
    },
    {
      path: '/checkout',
      element: <Checkout />
    },
    {
      path: '/stripe-checkout',
      element: <CheckoutForm />
    },
    {
      path: '/return',
      element: <Return />
    }
  ]
};


export default MainRoutes;
