import { RouterProvider } from "react-router-dom";
import routes from "./routes.ts";
import { AuthProvider } from "./contexts/authContext.tsx";


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}