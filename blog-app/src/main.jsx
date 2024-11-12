import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Import Provider
import store from "./redux/store"; // Import your store
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext";

// Wrap your app with the Provider and pass the Redux store
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        {" "}
        {/* Add the Provider here */}
        <App />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
