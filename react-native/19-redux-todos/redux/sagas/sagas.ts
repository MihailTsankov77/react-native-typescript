import {all, call, debounce, delay, fork, put, race, StrictEffect, take, TakeEffect, takeEvery, takeLatest} from "redux-saga/effects";
import { Actions, AddTodoStartT, DeleteTodoStartT, EditTodoStartT, SearchTodosListeningT } from "../actions/actionTypes";
import {TodosAPI} from "../../dao/rest-api-client"
import { Todo } from "../../model/todo.model";
import {AddTodoSuccess, DeleteTodoSuccess, EditTodoSuccess, Failed, GetTodosStart, GetTodosSuccess } from "../actions/todo-AsyncActions";
import { SearchTodosDone } from "../actions/todo-actions";

export function* watchFetchAsyncRequests() {
    yield all([
        takeLatest(Actions.GET_TODOS_START, requestFetchAllAsync),
        takeLatest(Actions.ADD_TODO_START, requestFetchAddAsync),
        takeLatest(Actions.DELETE_TODO_START, requestFetchDeleteAsync),
        takeLatest(Actions.EDIT_TODO_START, requestFetchEditAsync),
        debounce(500, Actions.SEARCH_TODOS_LISTENING, search),
    ]);
}

function*  requestFetchAllAsync(): Generator<StrictEffect, void, Todo[]>{
    try{
        const todos = yield call(TodosAPI.findAll);
        yield put(GetTodosSuccess(todos));
    }catch(error){
        yield put(Failed(error as string));
    }
}

function*  requestFetchAddAsync(action: AddTodoStartT): Generator<StrictEffect, void, Todo>{
    try{
        const todo = yield call(TodosAPI.create, action.payload.todo);
        yield put(AddTodoSuccess(todo));
    }catch(error){
        yield put(Failed(error as string));
    }
}

function*  requestFetchDeleteAsync(action: DeleteTodoStartT): Generator<StrictEffect, void, {deley: void, cancel: TakeEffect}>{
    try{
        const {cancel} = yield race({ 
            deley: delay(700),
            cancel: take(Actions.DELETE_TODO_CANCEL)
        });
        if(!cancel){
            yield call(TodosAPI.deleteById, action.payload.todo.id);
            yield put(DeleteTodoSuccess(action.payload.todo));
        }
    }catch(error){
        yield put(Failed(error as string));
    }
}


function*  requestFetchEditAsync(action: EditTodoStartT): Generator<StrictEffect, void, Todo>{
    try{
        const todo = yield call(TodosAPI.update, action.payload.todo);
        yield put(EditTodoSuccess(action.payload.todo));
    }catch(error){
        yield put(Failed(error as string));
    }
}

export function* search(action: SearchTodosListeningT): Generator<StrictEffect, void, string>{
    yield put(SearchTodosDone(action.text));
}
export function* initSaga(): Generator<StrictEffect, void, Todo[]>{
    yield put(GetTodosStart());
}



