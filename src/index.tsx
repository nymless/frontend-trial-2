import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { CookiesProvider } from "react-cookie";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./server/browser");
  worker.start({
    waitUntilReady: true,
    onUnhandledRequest: "bypass",
  });
}

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
