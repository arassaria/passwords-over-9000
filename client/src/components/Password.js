import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deletePassword, getPassword } from "../utils/api";

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
      {password.length !== 0 ? (
        <div>
          <p>
            <span>PasswordName: </span>
            <span>{name}</span>
          </p>
          <p>
            <span>Userdata: </span>
            <span>{password[0]}</span>
          </p>
          <p>
            <span>Password: </span>
            <span>{password[1]}</span>
          </p>
        </div>
      ) : (
        <p>404 Password not Found</p>
      )}
      <button onClick={() => handleEditClick(name, password[0], password[1])}>
        EDIT
      </button>
      <button onClick={() => handleClick(name)}>DELETE!</button>
    </div>
  );
}
