import { Dashboard } from "@mui/icons-material";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/login";
import EventsPage from './dashboard/events.tsx';

let routes = createBrowserRouter([
  { path: "login", Component: SignIn },
  {
    path: "/",
    Component: Dashboard,
    children: [
      {
        path: "events", 
        Component: EventsPage, 
        children: [{
          path: ":eventId", 
          Component: EventsPage, 
        }]
    },
    ]
  },
]);

export default routes