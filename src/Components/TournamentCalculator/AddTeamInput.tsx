import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import Button from "../Common/Button/Button";
import Input from "../Common/Input/Input";
import { addTeam } from "./state/tournamentSlice";

const AddTeamInput = () => {
  const [teamName, setTeamName] = useState<string>("");
  const dispatch = useAppDispatch();

  const onTeamNameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTeamName(e.currentTarget.value);
  };

  const onAddTeamHandler = () => {
    dispatch(addTeam(teamName.trim()));
    setTeamName("");
  };

  return (
    <div>
      <Input
        placeholder="New team"
        onChange={onTeamNameChangeHandler}
        value={teamName}
      />
      <Button style={{ marginLeft: "1em" }} onClick={onAddTeamHandler}>
        Add
      </Button>
    </div>
  );
};

export default AddTeamInput;
