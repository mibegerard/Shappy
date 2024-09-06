import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

// routing
import router from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';


// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  console.log("vite app end point", import.meta.env.VITE_APP_END_POINT);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <AuthProvider> {/* Wrap your RouterProvider with AuthProvider */}
            <RouterProvider router={router} />
          </AuthProvider>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
