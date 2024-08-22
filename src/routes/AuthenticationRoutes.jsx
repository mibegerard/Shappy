import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';

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
    }
  ]
};

export default AuthenticationRoutes;
