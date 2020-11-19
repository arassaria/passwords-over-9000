import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Password from "./components/Password";
import Form from "./components/Form";
import Edit from "./components/Edit";
import GlobalStyle from "./GlobalStyle";
import styled from "styled-components/macro";
import PasswordList from "./components/PasswordList";

const FakeButton = styled.span`
  border: 1px solid black;
  background: limegreen;
  color: black;
  padding: 5px 20px;
  box-shadow: 5px 5px 5px green;
  border-radius: 20px;
`;

const Footer = styled.div`
  text-align: right;
  margin-top: 4rem;
  margin-right: 2rem;
`;

function App() {
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
            <Password />
            <Footer>
              <Link to="/">
                <FakeButton>Home</FakeButton>
              </Link>
            </Footer>
          </Route>
          <Route path="/">
            <PasswordList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
