import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./reducers.js";
import { Provider } from "react-redux";

import { initSocket } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
let renderStuff;

if (location.pathname == "/welcome") {
    // console.log("welcome works");
    renderStuff = <Welcome />;
} else {
    initSocket(store);
    renderStuff = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    renderStuff,
    document.querySelector("main")
    //main from html, to je root
);
