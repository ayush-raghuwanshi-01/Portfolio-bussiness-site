import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { initAnalytics } from "@/lib/analytics";
import "lenis/dist/lenis.css";
import "./index.css";

initAnalytics();
createRoot(document.getElementById("root")!).render(<App />);
