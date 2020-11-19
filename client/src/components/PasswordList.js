import React from "react";
import useAsync from "../hooks/useAsync";
import { getPasswordNames } from "../utils/api";
import { useEffect } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const PasswordsList = styled.ul`
  padding-inline-start: 0;
  list-style-type: none;
  text-align: center;
`;

const ListItem = styled.li`
  margin: 1.5rem;
`;

const FakeButton = styled.span`
  border: 1px solid black;
  background: limegreen;
  color: black;
  padding: 5px 20px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px green;
`;

const Footer = styled.div`
  text-align: right;
  margin-top: 4rem;
  margin-right: 2rem;
`;

export default function PasswordList() {
  const { data, loading, error, doFetch } = useAsync(() => getPasswordNames());
  useEffect(() => {
    doFetch();
  }, []);
  return (
    <div>
      <h3>Your Passwords</h3>
      {loading && <div>loading...</div>}
      {error && <div>{error.message}</div>}
      <PasswordsList>
        {data &&
          data.map((passwordName, index) => (
            <ListItem key={index}>
              <Link to={`/${passwordName}`}>
                <FakeButton>{passwordName}</FakeButton>
              </Link>
            </ListItem>
          ))}
      </PasswordsList>
      <Footer>
        <Link to="/password">
          <FakeButton>New Password</FakeButton>
        </Link>
      </Footer>
    </div>
  );
}
