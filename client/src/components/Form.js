import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createNewPassword } from "../utils/api";
import styled from "styled-components/macro";

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 40%;
  margin: 1rem auto;
  padding: 5px 0;
  box-shadow: 5px 5px 5px black;
  border: none;
`;

const Button = styled.button`
  border: 1px solid black;
  background: grey;
  color: black;
  padding: 5px 20px;
  box-shadow: 5px 5px 5px black;
  width: 20%;
  margin: 1rem auto;
`;

const FakeButton = styled.span`
  border: 1px solid black;
  background: grey;
  color: black;
  padding: 5px 20px;
  box-shadow: 5px 5px 5px black;
`;

const Footer = styled.div`
  text-align: right;
  margin-top: 4rem;
  margin-right: 2rem;
`;

export default function Form() {
  const history = useHistory();
  const [passwordName, setPasswordName] = useState("");
  const [userdata, setUserdata] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  function handleNameChange(e) {
    setPasswordName(e.target.value);
  }

  function handleUserdataChange(e) {
    setUserdata(e.target.value);
  }

  function handlePasswordValueChange(e) {
    setPasswordValue(e.target.value);
  }

  function handleSubmit(passwordName, userdata, passwordValue) {
    createNewPassword(passwordName, userdata, passwordValue);
    history.push("/");
  }

  return (
    <div>
      <FormStyle
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(passwordName, userdata, passwordValue);
        }}
      >
        <Input
          type="text"
          onChange={handleNameChange}
          value={passwordName}
          placeholder="Password name"
        />
        <Input
          type="text"
          onChange={handleUserdataChange}
          value={userdata}
          placeholder="Userdate"
        />
        <Input
          type="password"
          onChange={handlePasswordValueChange}
          value={passwordValue}
          placeholder="Password"
        />
        <Button type="submit">Submit</Button>
      </FormStyle>
      <Footer>
        <Link to="/">
          <FakeButton>Home</FakeButton>
        </Link>
      </Footer>
    </div>
  );
}
