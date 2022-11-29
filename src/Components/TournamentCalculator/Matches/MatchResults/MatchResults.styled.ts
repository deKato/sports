import styled from "styled-components";
import Input from "../../../Common/Input/Input";

export const StyledScoreInput = styled(Input)`
  width: 20px;
`;

export const StyledScoreContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px 1fr;
  span {
    display: flex;
    justify-content: center;
  }
`;

export const StyledTeamScoreContainer = styled.div`
  display: flex;
  white-space: nowrap;
`;
