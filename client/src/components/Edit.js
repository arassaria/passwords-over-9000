import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updatePassword } from "../utils/api";

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
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(passwordName, userdata, passwordValue);
        }}
      >
        <input type="text" onChange={handleNameOnChange} value={passwordName} />
        <input type="text" onChange={handleUserdataOnChange} value={userdata} />
        <input
          type="text"
          onChange={handlePasswordValueOnChange}
          value={passwordValue}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
