import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deletePassword, getPassword } from "../utils/api";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  text-align: center;
  margin: 2rem;
`;

const WrapperObject = styled.div`
  background: yellow;
  border: 1px solid black;
  margin: 1rem auto;
  width: 40%;
  padding: 0.5rem 0;
  box-shadow: 5px 5px 5px green;
`;

const Button = styled.button`
  display: block;
  border: 1px solid black;
  background: grey;
  color: black;
  padding: 5px 20px;
  box-shadow: 5px 5px 5px black;
  width: 20%;
  margin: 1rem auto;
`;

const DangerButton = styled(Button)`
  background: red;
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
      <h3>Password {name}</h3>
      <Wrapper>
        <WrapperObject>
          <span>PasswordName: </span>
          <span>{name}</span>
        </WrapperObject>
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
