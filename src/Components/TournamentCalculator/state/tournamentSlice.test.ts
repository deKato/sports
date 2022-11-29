import tournamentReducer from "./tournamentSlice";
import { TournamentState } from "../../../models/Models";
import { addTeam, matchesAdapter } from "./tournamentSlice";

describe("tournament reducer", () => {
  let initialState: TournamentState;
  beforeEach(() => {
    initialState = {
      teams: [],
      matches: matchesAdapter.getInitialState(),
    };
  });

  it("should handle initial state", () => {
    expect(tournamentReducer(undefined, { type: "unknown" })).toEqual({
      teams: [],
      matches: matchesAdapter.getInitialState(),
    });
  });

  it("should handle add team", () => {
    const teamName = "new team";
    expect(tournamentReducer(initialState, addTeam(teamName))).toEqual({
      teams: [
        {
          name: teamName,
          played: 0,
          win: 0,
          lost: 0,
          draw: 0,
          points: 0,
        },
      ],
      matches: matchesAdapter.getInitialState(),
    });
  });

  it("should handle add team and trim name", () => {
    const teamName = "    new team    ";
    expect(tournamentReducer(initialState, addTeam(teamName))).toEqual({
      teams: [
        {
          name: teamName.trim(),
          played: 0,
          win: 0,
          lost: 0,
          draw: 0,
          points: 0,
        },
      ],
      matches: matchesAdapter.getInitialState(),
    });
  });

  it("should handle not adding team with empty name", () => {
    const teamName = "";
    expect(tournamentReducer(initialState, addTeam(teamName))).toEqual({
      teams: [],
      matches: matchesAdapter.getInitialState(),
    });
  });

  it("should handle add 2 teams", () => {
    const initialState: TournamentState = {
      teams: [
        {
          name: "team",
          played: 0,
          win: 0,
          lost: 0,
          draw: 0,
          points: 0,
        },
      ],
      matches: matchesAdapter.getInitialState(),
    };

    const team2Name = "team 2";
    const state = tournamentReducer(initialState, addTeam(team2Name));
    expect(state.teams).toEqual([
      {
        name: "team",
        played: 0,
        win: 0,
        lost: 0,
        draw: 0,
        points: 0,
      },
      {
        name: team2Name,
        played: 0,
        win: 0,
        lost: 0,
        draw: 0,
        points: 0,
      },
    ]);

    expect(state.matches.ids.length).toEqual(1);
    expect(state.matches.entities[state.matches.ids[0]]?.team1.name).toEqual(
      "team 2"
    );
    expect(state.matches.entities[state.matches.ids[0]]?.team2.name).toEqual(
      "team"
    );
  });
});
