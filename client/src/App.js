import { useEffect, useState } from "react";
import { getPasswordNames } from "./utils/api";

function App() {
  const [passwordNames, setPasswordNames] = useState([""]);
  useEffect(() => {
    async function fetchData() {
      setPasswordNames(await getPasswordNames());
    }
    fetchData();
  }, []);
  console.log(passwordNames);
  return (
    <div>
      <h1>Passwords Over 9000</h1>
      <h3>Your Passwords</h3>
      <ul>
        {passwordNames &&
          passwordNames.map((passwordName) => <li>{passwordName}</li>)}
      </ul>
    </div>
  );
}

export default App;
