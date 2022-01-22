import {createStore, combineReducers,applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "../reducers/userReducer";
import blogReducer from "../reducers/blogReducer";
import postReducer from "./postReducer";


const rootReducer = combineReducers({
    user: userReducer,
    blog: blogReducer,
    post:postReducer
})
export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))