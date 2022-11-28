import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";
import MatchResults from "./MatchResults";

describe("Match results component", () => {
  it("should render with inputs if no score data is present", () => {
    const matchData = {
      id: "1",
      team1: {
        name: "one",
      },
      team2: {
        name: "two",
      },
    };
    render(
      <Provider store={store}>
        <MatchResults matchData={matchData} />
      </Provider>
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
    expect(screen.getByTestId("team-1-score-input")).toBeInTheDocument();
    expect(screen.getByTestId("team-2-score-input")).toBeInTheDocument();
  });

  it("should not render inputs if score data is present", () => {
    const matchData = {
      id: "1",
      team1: {
        name: "one",
        score: 1,
      },
      team2: {
        name: "two",
        score: 2,
      },
    };
    render(
      <Provider store={store}>
        <MatchResults matchData={matchData} />
      </Provider>
    );
    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.queryByTestId("team-1-score-input")).not.toBeInTheDocument();
    expect(screen.queryByTestId("team-2-score-input")).not.toBeInTheDocument();
  });
});
