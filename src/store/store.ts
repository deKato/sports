import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import tournamentReducer from "../Components/TournamentCalculator/state/tournamentSlice";
import { debounce } from "../utils/debounce";
import { loadState, saveState } from "../utils/localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    tournament: tournamentReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(
  debounce(() => {
    saveState({
      tournament: store.getState().tournament,
    });
  }, 1000)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
