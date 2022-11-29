import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { renderWithProviders } from "./store/test-utils";

describe("renders learn react link", () => {
  it("should add 2 teams, enter results and calculate points (team 2 wins)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await user.type(screen.getByPlaceholderText("New team"), "winner team");
    await user.click(screen.getByText(/add/i));
    await user.type(screen.getByPlaceholderText("New team"), "loser team");
    await user.click(screen.getByText(/add/i));

    await user.type(screen.getByTestId("team-1-score-input"), "1");
    await user.type(screen.getByTestId("team-2-score-input"), "2");
    await user.tab();

    expect(screen.getAllByRole("row")[1]).toHaveTextContent(
      "1winner team11003"
    );
    expect(screen.getAllByRole("row")[2]).toHaveTextContent("2loser team10010");
  });

  it("should add 2 teams, enter results and calculate points (team 1 wins)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await user.type(screen.getByPlaceholderText("New team"), "team a");
    await user.click(screen.getByText(/add/i));
    await user.type(screen.getByPlaceholderText("New team"), "team b");
    await user.click(screen.getByText(/add/i));

    await user.type(screen.getByTestId("team-1-score-input"), "2");
    await user.type(screen.getByTestId("team-2-score-input"), "1");
    await user.tab();

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("1team b11003");
    expect(screen.getAllByRole("row")[2]).toHaveTextContent("2team a10010");
  });

  it("should add 2 teams, enter results and calculate points (draw)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);
    await user.type(screen.getByPlaceholderText("New team"), "team a");
    await user.click(screen.getByText(/add/i));
    await user.type(screen.getByPlaceholderText("New team"), "team b");
    await user.click(screen.getByText(/add/i));

    await user.type(screen.getByTestId("team-1-score-input"), "0");
    await user.type(screen.getByTestId("team-2-score-input"), "0");
    await user.tab();

    expect(screen.getAllByRole("row")[1]).toHaveTextContent("1team a10101");
    expect(screen.getAllByRole("row")[2]).toHaveTextContent("2team b10101");
  });
});
