import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPassword } from "../utils/api";

export default function Password() {
  //   let match = useParams();
  const { name } = useParams();
  const [password, setPassword] = useState([]);
  useEffect(() => {
    async function fetchData(name) {
      setPassword(await getPassword(name));
    }
    fetchData(name);
  }, [name]);
  return (
    <div>
      {password.length !== 0 ? (
        password.map((password, index) => <p key={index}>{password}</p>)
      ) : (
        <p>404 Password not Found</p>
      )}
    </div>
  );
}
