import { Todo } from "../../model/todo.model";
import { Actions, AddTodoStartT, AddTodoSuccessT, DeleteTodoCancelT, DeleteTodoStartT, DeleteTodoSuccessT, EditTodoStartT, EditTodoSuccessT, FailedT, GetTodosStarts, GetTodosSuccessT } from "./actionTypes";


export function GetTodosStart(): GetTodosStarts {
    return {
        type: Actions.GET_TODOS_START,
    };
}

export function GetTodosSuccess(todos: Todo[]): GetTodosSuccessT {
    return {
        type: Actions.GET_TODOS_SUCCESS,
        payload:{
            todos
        }
    };
}

export function Failed(error: string): FailedT {
    return {
        type: Actions.Failed,
        payload:{
            error
        }
    };
}

export function AddTodoStart(todo: Todo): AddTodoStartT {
    return {
        type: Actions.ADD_TODO_START,
        payload:{
            todo,
        }
    };
}

export function AddTodoSuccess(todo: Todo): AddTodoSuccessT {
    return {
        type: Actions.ADD_TODO_SUCCESS,
        payload:{
            todo,
        }
    };
}

export function DeleteTodoStart(todo: Todo): DeleteTodoStartT {
    return {
        type: Actions.DELETE_TODO_START,
        payload:{
            todo
        }
    };
}

export function DeleteTodoSuccess(todo: Todo): DeleteTodoSuccessT {
    return {
        type: Actions.DELETE_TODO_SUCCESS,
        payload:{
            todo
        }
    };
}
export function DeleteTodoCancel(): DeleteTodoCancelT {
    return {
        type: Actions.DELETE_TODO_CANCEL,
    };
}

export function EditTodoStart(todo: Todo): EditTodoStartT {
    return {
        type: Actions.EDIT_TODO_START,
        payload:{
            todo
        }
    };
}

export function EditTodoSuccess(todo: Todo): EditTodoSuccessT {
    return {
        type: Actions.EDIT_TODO_SUCCESS,
        payload:{
            todo
        }
    };
}