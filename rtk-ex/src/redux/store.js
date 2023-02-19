import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import adoptedPet, { adopt } from "./adoptedPetSlice";
import searchParams from "./searchParamsSlice";
import { petApi } from "../apis/petApiService";
import fetchPet from "../apis/fetchPet";

//Below middlware is not implemented, but used as an example.
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: adopt,
  effect: async (action, listenerApi) => {
    const { petId } = action.payload;
    const pet = await fetchPet(petId);
    await listenerApi.delay(500);
    listenerApi.dispatch(adopt(pet));
  },
});

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false })
      // Listener middleware would be passed here
      // .prepend(listenerMiddleware)
      .concat(petApi.middleware),
});

export default store;
