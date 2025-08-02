import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/login";
import EventsPage from './dashboard/events.tsx';
import ProtectedRoute from "./pages/protectedRoute.tsx";
import Dashboard from "./pages/dashboard.tsx";



let routes = createBrowserRouter([
  { path: "login", Component: SignIn },
  {
    Component: ProtectedRoute,
    children: [{
      path: "/",
        Component: Dashboard,
        children: [{
          path: "events", 
          Component: EventsPage, 
          children: [{
            path: ":eventId", 
            Component: EventsPage, 
          }]
        }]
      }
    ]
  }
]);

export default routes