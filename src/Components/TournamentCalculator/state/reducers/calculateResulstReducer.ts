import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { TeamScore, TeamsState } from "../../../../models/Models";

export const calculateResultsReducer: CaseReducer<
  TeamsState,
  PayloadAction<[TeamScore, TeamScore]>
> = (state, action) => {
  if (action.payload[0].score === action.payload[1].score) {
    updateMatchDrawStats(state, action);
    return;
  }
  updateMatchStats(state, action);
};

const updateMatchDrawStats = (
  state: TeamsState,
  action: PayloadAction<[TeamScore, TeamScore]>
) => {
  const team1Index = state.teams.findIndex(
    (team) => team.name === action.payload[0].name
  );
  const team2Index = state.teams.findIndex(
    (team) => team.name === action.payload[1].name
  );

  updateDrawScore(state, team1Index);
  updateDrawScore(state, team2Index);
};

const updateDrawScore = (state: TeamsState, teamIndex: number) => {
  state.teams[teamIndex] = {
    ...state.teams[teamIndex],
    draw: state.teams[teamIndex].draw + 1,
    points: state.teams[teamIndex].points + 1,
    played: state.teams[teamIndex].played + 1,
  };
};

const updateMatchStats = (
  state: TeamsState,
  action: PayloadAction<[TeamScore, TeamScore]>
) => {
  const winner = action.payload.reduce(function (prev, current) {
    return prev.score! > current.score! ? prev : current;
  });
  const winnerIndex = state.teams.findIndex(
    (team) => team.name === winner.name
  );

  const loser = action.payload.find((team) => team.name !== winner.name);
  const loserIndex = state.teams.findIndex((team) => team.name === loser!.name);

  state.teams[winnerIndex] = {
    ...state.teams[winnerIndex],
    win: state.teams[winnerIndex].win + 1,
    points: state.teams[winnerIndex].points + 3,
    played: state.teams[winnerIndex].played + 1,
  };

  state.teams[loserIndex] = {
    ...state.teams[loserIndex],
    lost: state.teams[loserIndex].lost + 1,
    played: state.teams[loserIndex].played + 1,
  };
};
