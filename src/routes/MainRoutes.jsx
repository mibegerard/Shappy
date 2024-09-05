import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
const Home = Loadable(lazy(() => import('views/pages/home')));
const ProducteurAccueil = Loadable(lazy(() => import('views/pages/ProducteurAccueil')));
const DeposerPotager = Loadable(lazy(() => import('views/pages/DeposerPotager')));
const PreviewProduct = Loadable(lazy(() => import('views/pages/preview')));

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
  ]
};


export default MainRoutes;
