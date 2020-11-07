import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
// responsible for making asynchrnous calls.
import thunk from "redux-thunk";
// this is a method from redux that allows us to store diffrent reducers
import rootReducer from "./reducers";

const middleware = [thunk];
// this initialstate object is where we store our reducers.
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;