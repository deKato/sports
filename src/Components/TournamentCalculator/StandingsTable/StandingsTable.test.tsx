import { renderWithProviders } from "../../../store/test-utils";
import StandingsTable from "./StandingsTable";
import { screen } from "@testing-library/react";

describe("Standings table component", () => {
  it("should sort table by points descending", async () => {
    renderWithProviders(<StandingsTable />, {
      preloadedState: {
        tournament: {
          teams: [
            {
              name: "one",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 2,
            },
            {
              name: "two",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 3,
            },
            {
              name: "three",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 1,
            },
            {
              name: "four",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 3,
            },
          ],
          matches: {
            ids: ["1"],
            entities: {
              "1": {
                id: "1",
                team1: {
                  name: "two",
                },
                team2: {
                  name: "one",
                },
              },
            },
          },
        },
      },
    });

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("3");
    expect(screen.getAllByRole("row")[2]).toHaveTextContent("3");
    expect(screen.getAllByRole("row")[3]).toHaveTextContent("2");
    expect(screen.getAllByRole("row")[4]).toHaveTextContent("1");
  });
});
