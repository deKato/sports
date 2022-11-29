import { useAppSelector } from "../../../store/hooks";
import MatchResults from "./MatchResults/MatchResults";
import { matchSelectors } from "../state/tournamentSlice";
import { StyledMatchesContainer } from "./Matches.styled";

const MatchScores = () => {
  const matchData = useAppSelector(matchSelectors.selectAll);

  return (
    <StyledMatchesContainer>
      {matchData &&
        matchData.map((match, index) => (
          <MatchResults key={index} matchData={match} />
        ))}
    </StyledMatchesContainer>
  );
};

export default MatchScores;
