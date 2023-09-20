import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
// For google authendication
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
// For Redux
import { PersistGate } from "redux-persist/integration/react";
import { Store, persistor } from "./Redux/store";
import { Provider } from "react-redux";
// For React query
import { QueryClient, QueryClientProvider } from "react-query";
// Render the app inside the PersistGate
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="329620575621-v54qd8b32lei37p5f5uh1tcjjbso07ak.apps.googleusercontent.com">
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </React.StrictMode>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);
