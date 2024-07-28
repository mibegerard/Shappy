import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';
import MainLayout from '../layout/MainLayout';
const Home = Loadable(lazy(() => import('views/pages/home')));
const ProducteurAccueil = Loadable(lazy(() => import('views/pages/ProducteurAccueil')));

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
      path: 'je-suis-producteur',
      element: <ProducteurAccueil />
    },
  ]
};


export default MainRoutes;
