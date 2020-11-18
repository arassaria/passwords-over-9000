import { useEffect, useState } from "react";
import { getPasswordNames } from "./utils/api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Password from "./components/Password";
import Form from "./components/Form";
import Edit from "./components/Edit";
import GlobalStyle from "./GlobalStyle";
import styled from "styled-components/macro";

const PasswordList = styled.ul`
  padding-inline-start: 0;
  list-style-type: none;
  text-align: center;
`;

const ListItem = styled.li`
  margin: 1.5rem;
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

function App() {
  const [passwordNames, setPasswordNames] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setPasswordNames(await getPasswordNames());
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <div>
        <h1>Passwords Over 9000</h1>
        <Switch>
          <Route path="/edit">
            <Edit />
          </Route>
          <Route path="/password">
            <Form />
          </Route>
          <Route path="/:name">
            {error && <div>{error.message}</div>}
            <Password />
            <Link to="/">Home</Link>
          </Route>
          <Route path="/">
            <h3>Your Passwords</h3>
            {loading && <div>loading...</div>}
            <PasswordList>
              {passwordNames &&
                passwordNames.map((passwordName, index) => (
                  <ListItem key={index}>
                    <Link to={`/${passwordName}`}>
                      <FakeButton>{passwordName}</FakeButton>
                    </Link>
                  </ListItem>
                ))}
            </PasswordList>
            <Footer>
              <Link to="/password">
                <FakeButton>New Password</FakeButton>
              </Link>
            </Footer>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
