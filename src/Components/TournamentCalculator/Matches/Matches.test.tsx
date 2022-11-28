import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../store/test-utils";
import Matches from "./Matches";
import { screen } from "@testing-library/react";

describe("Matches component", () => {
  it("should disable inputs when both fields receive different scores", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Matches />, {
      preloadedState: {
        tournament: {
          teams: [
            {
              name: "one",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 0,
            },
            {
              name: "two",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 0,
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

    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();

    await user.type(screen.getByTestId("team-1-score-input"), "1");
    await user.type(screen.getByTestId("team-2-score-input"), "2");
    await user.tab();
    await screen.findByText("1");

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.queryByTestId("team-1-score-input")).not.toBeInTheDocument();
    expect(screen.queryByTestId("team-2-score-input")).not.toBeInTheDocument();
  });

  it("should disable inputs when both teams receive draw scores", async () => {
    const user = userEvent.setup();

    renderWithProviders(<Matches />, {
      preloadedState: {
        tournament: {
          teams: [
            {
              name: "one",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 0,
            },
            {
              name: "two",
              played: 0,
              win: 0,
              lost: 0,
              draw: 0,
              points: 0,
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

    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();

    await user.type(screen.getByTestId("team-1-score-input"), "1");
    await user.type(screen.getByTestId("team-2-score-input"), "1");
    await user.tab();

    expect(screen.getAllByText("1").length).toBe(2);
    expect(screen.queryByTestId("team-1-score-input")).not.toBeInTheDocument();
    expect(screen.queryByTestId("team-2-score-input")).not.toBeInTheDocument();
  });
});
