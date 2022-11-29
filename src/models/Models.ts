import { EntityState } from "@reduxjs/toolkit";

export interface Team {
  name: string;
  played: number;
  win: number;
  lost: number;
  draw: number;
  points: number;
}

export interface TeamScore {
  name: string;
  score?: number;
}

export type Match = { id: string; team1: TeamScore; team2: TeamScore };

export interface TournamentState {
  teams: Team[];
  matches: EntityState<Match>;
}
