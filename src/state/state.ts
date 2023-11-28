import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./pokemons.slice";

const store = configureStore({
  reducer: {
    pokemons: reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
