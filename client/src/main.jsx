import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./app/context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
