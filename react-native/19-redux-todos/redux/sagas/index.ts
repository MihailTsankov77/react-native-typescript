import { all, fork } from "redux-saga/effects"
import { initSaga, watchFetchAsyncRequests } from "./sagas"

export const rootSaga = function* root(){
    yield all([fork(initSaga),fork(watchFetchAsyncRequests)])
}