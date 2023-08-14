import { combineReducers } from "redux";
import event from "~/store/reducer/event";
import user from "~/store/reducer/user";

export default combineReducers({ event, user });
