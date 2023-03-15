
import { combineReducers } from "redux";
import userReducer from './reducers/userReducer';

export default combineReducers({
    //Nome do reducer
    user:userReducer
});

