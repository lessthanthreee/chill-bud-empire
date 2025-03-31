
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove any default Lovable content initialization
createRoot(document.getElementById("root")!).render(<App />);
