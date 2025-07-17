import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider } from '@toolpad/core/internal';
import { Outlet } from 'react-router';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import theme from '../theme';

const NAVIGATION: Navigation = [
  {
    segment: 'events',
    title: 'Events',
    icon: <DashboardIcon />,  
  },
  {
    segment: 'admins',
    title: 'Admins',
    icon: <ShoppingCartIcon />,
  },
    {
    segment: 'notifications',
    title: 'Notifications',
    icon: <ShoppingCartIcon />,
  },
];




export default function Dashboard() {

  return (
    <DemoProvider>
      <ReactRouterAppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
          title: 'MUI',
          homeUrl: '/toolpad/core/introduction',
        }}
        theme={theme}
      >
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ReactRouterAppProvider>
    </DemoProvider>
  );
}
