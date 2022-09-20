import { FilterType } from "../../components/TodoList";
import { Todo } from "../../model/todo.model";

export const enum Actions{
    GET_TODOS_START= "getting todos from api",
    GET_TODOS_SUCCESS= "Succeed getting todos",

    ADD_TODO_START= "add todo to api",
    ADD_TODO_SUCCESS= "Succeed adding todo",

    DELETE_TODO_START= "delete todo to api",
    DELETE_TODO_SUCCESS= "Succeed deleting todo",
    DELETE_TODO_CANCEL= "CANCEL deleting todo",

    EDIT_TODO_START= "edit todo to api",
    EDIT_TODO_SUCCESS= "Succeed edit todo",


    SEARCH_TODOS_LISTENING= "Searching",
    SEARCH_TODOS_DONE= "Searched",

    Failed= "Failed!!!",
    EDIT_TODO = "Give the form to edit",
    Filter_todo="filter Todos"
}


interface payloadTodo{
    payload: {
        todo: Todo
    };
}

export interface GetTodosStarts{
    type: Actions.GET_TODOS_START;
}
export interface GetTodosSuccessT{
    type: Actions.GET_TODOS_SUCCESS;
    payload: {
        todos: Todo[]
    }
}
export interface FailedT{
    type: Actions.Failed;
    payload: {
        error: string;
    };
}

export interface AddTodoStartT extends payloadTodo{
    type: Actions.ADD_TODO_START;  
}
export interface AddTodoSuccessT extends payloadTodo{
    type: Actions.ADD_TODO_SUCCESS;  
}

export interface DeleteTodoStartT  extends payloadTodo{
    type: Actions.DELETE_TODO_START;
}
export interface DeleteTodoSuccessT  extends payloadTodo{
    type: Actions.DELETE_TODO_SUCCESS;
}
export interface DeleteTodoCancelT {
    type: Actions.DELETE_TODO_CANCEL;
}

export interface EditTodoStartT extends payloadTodo{
    type: Actions.EDIT_TODO_START;
}
export interface EditTodoSuccessT extends payloadTodo{
    type: Actions.EDIT_TODO_SUCCESS;
}

export interface EditTodoT extends payloadTodo{
    type: Actions.EDIT_TODO;
}
export interface SearchTodosListeningT{
    type: Actions.SEARCH_TODOS_LISTENING;
    text: string;
}
export interface SearchTodosDoneT{
    type: Actions.SEARCH_TODOS_DONE;
    text: string;
}

export interface FilterTodos {
    type: Actions.Filter_todo;
    payload: {
        filter: FilterType;
    };
}

export type TodoAction =  EditTodoT | FilterTodos | SearchTodosListeningT | SearchTodosDoneT;

export type TodoAsyncActions = GetTodosStarts | GetTodosSuccessT | FailedT | 
                                AddTodoStartT | AddTodoSuccessT |
                                DeleteTodoStartT | DeleteTodoSuccessT | DeleteTodoCancelT |
                                EditTodoStartT | EditTodoSuccessT;