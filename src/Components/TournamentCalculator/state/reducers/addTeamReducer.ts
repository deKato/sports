import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { TournamentState } from "../../../../models/Models";
import { matchesAdapter } from "../tournamentSlice";
import { v4 as uuidv4 } from "uuid";

export const addTeamReducer: CaseReducer<
  TournamentState,
  PayloadAction<string>
> = (state, action) => {
  const newTeamName = action.payload.trim();
  const teamExists = !!state.teams?.find((team) => team.name === newTeamName);
  if (!teamExists && newTeamName && newTeamName.length > 0) {
    const newTeam = {
      name: action.payload.trim(),
      played: 0,
      win: 0,
      lost: 0,
      draw: 0,
      points: 0,
    };

    state.teams.push(newTeam);
    state.teams.forEach((team) => {
      if (team.name !== newTeamName) {
        matchesAdapter.addOne(state.matches, {
          id: uuidv4(),
          team1: { name: newTeamName },
          team2: { name: team.name },
        });
      }
    });
  }
};
