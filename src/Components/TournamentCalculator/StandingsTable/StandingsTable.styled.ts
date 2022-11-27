import styled from "styled-components";

export const StyledTable = styled.table`
  margin-top: 1rem;
  color: #333;
  background: white;
  border: 1px solid grey;
  font-size: 12pt;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5em;
    border: 1px solid grey;
  }

  th {
    background-color: lightgray;
  }

  td {
    text-align: center;
  }
`;
