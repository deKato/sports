import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Match, TournamentState } from "../../../models/Models";
import { RootState } from "../../../store/store";
import { addTeamReducer } from "./reducers/addTeamReducer";
import { calculateResultsReducer } from "./reducers/calculateResulstReducer";
import { updateMatchesStateReducer } from "./reducers/updateMatchesStateReducer";

export const matchesAdapter = createEntityAdapter<Match>({
  selectId: (match) => match.id,
});

const initialState: TournamentState = {
  teams: [],
  matches: matchesAdapter.getInitialState(),
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    calculateResults: calculateResultsReducer,
    saveScores: updateMatchesStateReducer,
    addTeam: addTeamReducer,
  },
});

export const { addTeam, calculateResults, saveScores } =
  tournamentSlice.actions;

export const selectTeams = (state: RootState) => state.tournament.teams;
export const matchSelectors = matchesAdapter.getSelectors<RootState>(
  (state) => state.tournament.matches
);

export default tournamentSlice.reducer;
