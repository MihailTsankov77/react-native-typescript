import { combineReducers } from "redux";
import todos, { TodoState } from "./todos";

export interface StoreState {
    todos: TodoState
}

export default combineReducers({todos});