import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({});

const midlewares = applyMiddleware(thunk);

export const store = createStore(rootReducer, midlewares);
