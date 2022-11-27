import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { TeamsState } from "../../../../models/Models";
import { matchesAdapter } from "../tournamentSlice";
import { v4 as uuidv4 } from "uuid";

export const addTeamReducer: CaseReducer<TeamsState, PayloadAction<string>> = (
  state,
  action
) => {
  const teamExists = !!state.teams?.find(
    (team) => team.name === action.payload
  );
  if (!teamExists && action.payload && action.payload.trim().length > 0) {
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
      if (team.name !== action.payload) {
        matchesAdapter.addOne(state.matches, {
          id: uuidv4(),
          team1: { name: action.payload },
          team2: { name: team.name },
        });
      }
    });
  }
};
