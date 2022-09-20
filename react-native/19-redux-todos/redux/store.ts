import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import { TodoAction, TodoAsyncActions } from "./actions/actionTypes";
import rootReducer, { StoreState } from './reducers';
import { rootSaga } from "./sagas";



const middleWare = createSagaMiddleware();

export const store = createStore<StoreState, TodoAction | TodoAsyncActions, unknown, unknown>(
    rootReducer,
    composeWithDevTools(applyMiddleware(middleWare)),
  );

  middleWare.run(rootSaga);