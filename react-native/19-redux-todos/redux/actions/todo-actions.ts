import { FilterType } from "../../components/TodoList";
import { Todo } from "../../model/todo.model";
import { Actions, EditTodoT, FilterTodos, SearchTodosDoneT, SearchTodosListeningT } from "./actionTypes";

export function EditTodos(todo: Todo): EditTodoT {
    return {
        type: Actions.EDIT_TODO,
        payload:{
            todo: todo,
        }
    };
}

export function SearchTodosListening(text: string): SearchTodosListeningT {
    return {
        type: Actions.SEARCH_TODOS_LISTENING,
        text
    };
}
export function SearchTodosDone(text: string): SearchTodosDoneT {
    return {
        type: Actions.SEARCH_TODOS_DONE,
        text
    };
}

export function fiterTodos(filter: FilterType): FilterTodos {
    return {
        type: Actions.Filter_todo,
        payload:{
            filter: filter,
        }
    };
}

