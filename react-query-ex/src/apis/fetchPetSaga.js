import { put, delay } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import adoptPet, { adopt } from "../../../rtk-ex/src/redux/adoptedPetSlice";
import fetchPet from "../../../rtk-ex/src/apis/fetchPet";

const SagaMiddleware = createSagaMiddleware();

function* fetchPetSaga(action) {
  const { todoId } = action.payload;
  const todo = yield fetchPet(todoId);
  yield delay(500);
  yield put(adopt(todo));
}

SagaMiddleware.run(fetchPetSaga);

export const store = configureStore({
  reducer: {
    adoptPet,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware);
  },
});
