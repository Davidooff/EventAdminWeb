import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Outlet } from 'react-router-dom';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import theme from '../theme';
import { useEffect, useState } from 'react';
import getAdminOptions from '../utils/requests/auth/getAdminOptions';
import { EAdminOptions } from '../enums/eAdminOprions';


export default function Dashboard() {
  const [navigation, setNavigation] = useState<Navigation | undefined>(undefined)

  const updateOptions = async () => {
    var optionsRes = await getAdminOptions();
    console.log(optionsRes);
    
    if (!optionsRes.ok) {
      setNavigation(undefined);
      return;
    }
    var navi: Navigation = []

    optionsRes.body.forEach(enumValue => {
      switch (enumValue) {
        case EAdminOptions.users:
          navi.push({
            segment: "users",
            title: "Users",
          })
          break;
        case EAdminOptions.categories:
          navi.push({
            segment: "categories",
            title: "Categories",
          })
          break;
        case EAdminOptions.events:
          navi.push({
            segment: "events",
            title: "Events",
          })
          break;
        default:
          console.error("Admin category has unexpected value: ", enumValue)
          break;
      }
    })

    setNavigation(navi)
  }
  
  useEffect(() => {
    updateOptions();
  }, []) 

  return (
    <>
      <ReactRouterAppProvider
        navigation={navigation}
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
    </>
  );
}
