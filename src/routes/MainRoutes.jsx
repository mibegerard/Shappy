import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
const Home = Loadable(lazy(() => import('views/pages/home')));
const ProducteurAccueil = Loadable(lazy(() => import('views/pages/producteurAccueil')));
const DeposerPotager = Loadable(lazy(() => import('views/pages/deposerPotager')));
const PreviewProduct = Loadable(lazy(() => import('views/pages/preview')));
const MonMarche = Loadable(lazy(() => import('views/pages/monMarche')));
const ProductDetail = Loadable(lazy(() => import('ui-component/marche/ProductDetail')));

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
  ]
};


export default MainRoutes;
