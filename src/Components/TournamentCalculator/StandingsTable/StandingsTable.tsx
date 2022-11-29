import { useAppSelector } from "../../../store/hooks";
import { selectTeams } from "../state/tournamentSlice";
import { StyledTable } from "./StandingsTable.styled";

const StandingsTable = () => {
  const teamData = useAppSelector(selectTeams);

  const sortedTamData = [...teamData].sort((a, b) => b.points - a.points);

  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>Place</th>
          <th>Team</th>
          <th>Played</th>
          <th>Win</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Points</th>
        </tr>
        {sortedTamData.map((team, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
              <td>{team.played}</td>
              <td>{team.win}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              <td>{team.points}</td>
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default StandingsTable;
