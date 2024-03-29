import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import { HelmetProvider } from "react-helmet-async";
import Landing from "./containers/landing";
import Recommendation from "./containers/recommendation";
import HomePage from "./containers/homePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route
              path="/recommendation/:id/:bookIndex"
              element={
                <App>
                  <Recommendation />
                </App>
              }
            />
            <Route
              path="/home"
              element={
                <App>
                  <HomePage />
                </App>
              }
            />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
