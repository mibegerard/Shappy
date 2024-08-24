import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import RegisterProducteur from 'views/pages/authentification/RegisterProducteur';
import Login from 'views/pages/authentification/Login';

// login option 3 routing
const RegisterRestaurateur = Loadable(lazy(() => import('views/pages/authentification/RegisterRestaurateur')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/auth/register/restaurateur',
      element: <RegisterRestaurateur />
    },
    {
      path: '/auth/register/producteur',
      element: <RegisterProducteur />
    },
    {
      path: '/auth/login',
      element: <Login />
    }
  ]
};

export default AuthenticationRoutes;
