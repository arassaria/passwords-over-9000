import { useEffect, useState } from "react";
import { getPasswordNames } from "./utils/api";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Password from "./components/Password";

function App() {
  const [passwordNames, setPasswordNames] = useState([""]);
  useEffect(() => {
    async function fetchData() {
      setPasswordNames(await getPasswordNames());
    }
    fetchData();
  }, []);
  return (
    <Router>
      <div>
        <h1>Passwords Over 9000</h1>
        <Switch>
          <Route path="/:name">
            <Password />
            <Link to="/">Home</Link>
          </Route>
          <Route path="/">
            <h3>Your Passwords</h3>
            <ul>
              {passwordNames &&
                passwordNames.map((passwordName, index) => (
                  <li key={index}>
                    <Link to={`/${passwordName}`}>{passwordName}</Link>
                  </li>
                ))}
            </ul>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
