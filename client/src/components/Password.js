import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deletePassword, getPassword } from "../utils/api";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  text-align: center;
  margin: 2rem;
`;

const WrapperObject = styled.div`
  background: violet;
  color: black;
  border: 1px solid black;
  margin: 1rem auto;
  width: 40%;
  padding: 0.5rem 0;
  box-shadow: 5px 5px 5px purple;
  border-radius: 20px;
`;

const Button = styled.button`
  display: block;
  border: 1px solid black;
  background: limegreen;
  color: black;
  padding: 5px 20px;
  box-shadow: 5px 5px 5px green;
  border-radius: 20px;
  width: 20%;
  margin: 1rem auto;
`;

const DangerButton = styled(Button)`
  background: red;
  box-shadow: 5px 5px 5px darkred;
`;

export default function Password() {
  const history = useHistory();
  const { name } = useParams();
  const [password, setPassword] = useState([]);
  useEffect(() => {
    async function fetchData(name) {
      setPassword(await getPassword(name));
    }
    fetchData(name);
  }, [name]);

  async function handleClick(name) {
    await deletePassword(name);
    history.push("/");
  }

  function handleEditClick(name, userdata, passwordValue) {
    localStorage.setItem("passwordName", name);
    localStorage.setItem("userdata", userdata);
    localStorage.setItem("passwordValue", passwordValue);
    history.push("/edit");
  }

  return (
    <div>
      <Wrapper>
        <h3>Password {name}</h3>
        <WrapperObject>
          <span>Userdata: </span>
          <span>{password[0]}</span>
        </WrapperObject>
        <WrapperObject>
          <span>Password: </span>
          <span>{password[1]}</span>
        </WrapperObject>
        <Button onClick={() => handleEditClick(name, password[0], password[1])}>
          EDIT
        </Button>
        <DangerButton onClick={() => handleClick(name)}>DELETE!</DangerButton>
      </Wrapper>
    </div>
  );
}
