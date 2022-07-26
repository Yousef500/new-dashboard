/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import App from "App";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.min.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MaterialUIControllerProvider>
                    <App />
                </MaterialUIControllerProvider>
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
