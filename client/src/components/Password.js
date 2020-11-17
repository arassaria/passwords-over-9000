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
  return (
    <div>
      {password.length !== 0 ? (
        password.map((password, index) => <p key={index}>{password}</p>)
      ) : (
        <p>404 Password not Found</p>
      )}
      <button onClick={() => handleClick(name)}>DELETE!</button>
    </div>
  );
}
