import { StyledAppContainer } from "./App.styled";
import AddTeamInput from "./Components/TournamentCalculator/AddTeamInput";
import MatchScores from "./Components/TournamentCalculator/Matches/Matches";
import StandingsTable from "./Components/TournamentCalculator/StandingsTable/StandingsTable";

function App() {
  return (
    <StyledAppContainer>
      <div>
        <AddTeamInput />
        <StandingsTable />
      </div>
      <div>
        <MatchScores />
      </div>
    </StyledAppContainer>
  );
}

export default App;
