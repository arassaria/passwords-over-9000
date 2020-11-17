import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createNewPassword } from "../utils/api";

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

  async function handleSubmit(passwordName, userdata, passwordValue, e) {
    e.preventDefault();
    await createNewPassword(passwordName, userdata, passwordValue);
    history.push("/");
  }

  return (
    <div>
      <form
        onSubmit={() => handleSubmit(passwordName, userdata, passwordValue)}
      >
        <input
          type="text"
          onChange={handleNameChange}
          value={passwordName}
          placeholder="Password name"
        />
        <input
          type="text"
          onChange={handleUserdataChange}
          value={userdata}
          placeholder="Userdate"
        />
        <input
          type="password"
          onChange={handlePasswordValueChange}
          value={passwordValue}
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/">Home</Link>
    </div>
  );
}
