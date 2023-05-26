import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persister, store } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./assets/style/main.css";
import "antd/es/style/reset.css";
import 'bootstrap/dist/css/bootstrap.min.css'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);
