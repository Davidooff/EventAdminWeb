import { createRoot } from 'react-dom/client'
import "./reset.css"
import App from './app.tsx';



const root = document.getElementById("root");

createRoot(root!).render(
  <App />
);