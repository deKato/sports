import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Match, TournamentState } from "../../../../models/Models";
import { matchesAdapter } from "../tournamentSlice";

export const updateMatchesStateReducer: CaseReducer<
  TournamentState,
  PayloadAction<Match>
> = (state, action) => {
  let id = matchesAdapter.selectId(action.payload);

  matchesAdapter.updateOne(state.matches, {
    id,
    changes: action.payload,
  });
};
