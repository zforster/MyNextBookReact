import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import RecommendationById from "./containers/recommendationById";
import Home from "./containers/home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <App>
                <Home />
              </App>
            }
          />
          <Route
            path="/recommendation/:id"
            element={
              <App>
                <RecommendationById />
              </App>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
