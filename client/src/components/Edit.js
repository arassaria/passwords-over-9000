import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updatePassword } from "../utils/api";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

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

export default function Edit() {
  const history = useHistory();
  const [passwordName, setPasswordName] = useState(
    localStorage.getItem("passwordName")
  );
  const [userdata, setUserdata] = useState(localStorage.getItem("userdata"));
  const [passwordValue, setPasswordValue] = useState(
    localStorage.getItem("passwordValue")
  );

  function handleNameOnChange(e) {
    setPasswordName(e.target.value);
  }

  function handleUserdataOnChange(e) {
    setUserdata(e.target.value);
  }

  function handlePasswordValueOnChange(e) {
    setPasswordValue(e.target.value);
  }

  async function handleSubmit(passwordName, userdata, passwordValue) {
    await updatePassword(passwordName, userdata, passwordValue);
    localStorage.setItem("passwordName", "");
    localStorage.setItem("userdata", "");
    localStorage.setItem("passwordValue", "");
    history.push(`/${passwordName}`);
  }

  return (
    <div>
      <FormStyle
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(passwordName, userdata, passwordValue);
        }}
      >
        <Input type="text" onChange={handleNameOnChange} value={passwordName} />
        <Input type="text" onChange={handleUserdataOnChange} value={userdata} />
        <Input
          type="text"
          onChange={handlePasswordValueOnChange}
          value={passwordValue}
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
