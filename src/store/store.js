import { createStore } from "redux";

import { rootReducer } from "../reducers/reducers";

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() =>
    console.log(store.getState())
);

console.log("store.getstate", store.getState())
