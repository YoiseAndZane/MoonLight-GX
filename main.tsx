import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupThemeSystem } from "./lib/themeManager";

// Initialize theme system
setupThemeSystem();

createRoot(document.getElementById("root")!).render(<App />);
