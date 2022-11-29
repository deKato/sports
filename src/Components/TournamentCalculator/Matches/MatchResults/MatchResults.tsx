import { useEffect, useRef, useState } from "react";
import { Match } from "../../../../models/Models";
import { useAppDispatch } from "../../../../store/hooks";
import { calculateResults, saveScores } from "../../state/tournamentSlice";
import {
  StyledScoreContainer,
  StyledScoreInput,
  StyledTeamScoreContainer,
} from "./MatchResults.styled";

interface MatchResultsProps {
  matchData: Match;
}

const MatchResults = (props: MatchResultsProps) => {
  const { matchData } = props;
  const dispatch = useAppDispatch();
  const didMount = useRef(false);

  const [team1Score, setTeam1Score] = useState<string | undefined>();
  const [team2Score, setTeam2Score] = useState<string | undefined>();

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    }

    if (team1Score && team2Score) {
      dispatch(
        calculateResults([
          { name: matchData.team1.name, score: +team1Score },
          { name: matchData.team2.name, score: +team2Score },
        ])
      );
      dispatch(
        saveScores({
          id: matchData.id,
          team1: {
            name: matchData.team1.name,
            score: +team1Score,
          },
          team2: {
            name: matchData.team2.name,
            score: +team2Score,
          },
        })
      );
    }
  }, [team1Score, team2Score]);

  const onScoreChangeHandler = (
    teamScoreSetter: React.Dispatch<React.SetStateAction<string | undefined>>,
    score: string
  ) => {
    teamScoreSetter(score);
  };

  const bothTeamScoreEntered =
    matchData.team1.score !== undefined && matchData.team2.score !== undefined;

  const defaultSpacing = "24px";

  return (
    <StyledScoreContainer>
      <StyledTeamScoreContainer style={{ marginLeft: "auto" }}>
        <span>{matchData.team1.name}</span>
        {bothTeamScoreEntered ? (
          <span style={{ paddingLeft: defaultSpacing }}>
            {matchData.team1.score}
          </span>
        ) : (
          <StyledScoreInput
            style={{ marginLeft: defaultSpacing }}
            data-testid="team-1-score-input"
            onBlur={(e) =>
              onScoreChangeHandler(setTeam1Score, e.currentTarget.value)
            }
          />
        )}
      </StyledTeamScoreContainer>
      <span>:</span>
      <StyledTeamScoreContainer>
        {bothTeamScoreEntered ? (
          <span style={{ paddingRight: defaultSpacing }}>
            {matchData.team2.score}
          </span>
        ) : (
          <StyledScoreInput
            style={{ marginRight: defaultSpacing }}
            data-testid="team-2-score-input"
            onBlur={(e) =>
              onScoreChangeHandler(setTeam2Score, e.currentTarget.value)
            }
          />
        )}
        <span>{matchData.team2.name}</span>
      </StyledTeamScoreContainer>
    </StyledScoreContainer>
  );
};

export default MatchResults;
