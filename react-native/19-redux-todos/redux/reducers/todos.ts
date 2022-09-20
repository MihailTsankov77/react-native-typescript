
import { FilterType } from '../../components/TodoList';
import { Todo } from '../../model/todo.model';
import {Actions, TodoAction, TodoAsyncActions} from '../actions/actionTypes';

export interface TodoState {
    todos: Todo[];
    isLoading: boolean;
    edited: Todo | undefined;
    filter: FilterType
    error: string | undefined
    search: string;
}

const initialState: TodoState = {
    todos: [],
    isLoading: false,
    edited: undefined,
    filter: undefined,
    error: undefined,
    search:"",
};

export default function (state = initialState, action: TodoAction | TodoAsyncActions): TodoState {
    switch (action.type) {

        case Actions.GET_TODOS_START: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.GET_TODOS_SUCCESS: {
            const {todos} = action.payload;
            return {
                ...state,
                todos,
                isLoading: false,
            };
        }
        case Actions.Failed: {
            const {error} = action.payload;
            return {
                ...state,
                error,
                isLoading: false,
            };
        }
        case Actions.ADD_TODO_START: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.ADD_TODO_SUCCESS: {

            const {todo} = action.payload;
            return {
                ...state,
                todos: state.todos.concat(todo),
                isLoading: false,
            };
        }
        case Actions.DELETE_TODO_START: {
            return {
                ...state,
                isLoading:true,
            };
        }
        case Actions.DELETE_TODO_CANCEL: {
            return {
                ...state,
                isLoading:false,
            };
        }
        case Actions.DELETE_TODO_SUCCESS: {
            const {todo} = action.payload
            return {
                ...state,
                todos: state.todos.filter(t => t.id!==todo.id),
                isLoading: false,
            };
        }
        case Actions.SEARCH_TODOS_DONE: {
            return {
                ...state,
                search: action.text,
            };
        }
        case Actions.EDIT_TODO_START: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case Actions.EDIT_TODO_SUCCESS: {
            const {todo} = action.payload
            return {
                ...state,
                isLoading: false,
                edited: undefined,
                todos: state.todos.map(td => td.id === todo.id ? todo : td),
            };
        }
        case Actions.EDIT_TODO: {
            const {todo} = action.payload
            return {
                ...state,
                edited: todo,
            };
        }
        case Actions.Filter_todo: {
            const {filter} = action.payload
            return {
                ...state,
                filter: filter,
            };
        }
        default:
            return state;
    }
}