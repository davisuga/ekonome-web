import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/router";
import * as serviceWorker from "./serviceWorker";
import GlobalStyles from "./styles/GlobalStyles";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { translationResources } from "./translations";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translationResources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
