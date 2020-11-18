export async function getPasswordNames() {
  const result = await fetch("http://localhost:3001/api/passwords");
  const passwordNames = await result.json();
  return passwordNames;
}

export async function getPassword(name) {
  const result = await fetch(`http://localhost:3001/api/passwords/${name}`);
  const password = await result.json();
  return password;
}

export async function deletePassword(name) {
  await fetch(`http://localhost:3001/api/passwords/${name}`, {
    method: "DELETE",
  });
}

export async function createNewPassword(
  passwordName,
  newUserdata,
  newPasswordValue
) {
  await fetch(`http://localhost:3001/api/passwords`, {
    method: "POST",
    body: JSON.stringify({
      name: passwordName,
      userdata: newUserdata,
      value: newPasswordValue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function updatePassword(passwordName, userdata, passwordValue) {
  await fetch(`http://localhost:3001/api/passwords/${passwordName}`, {
    method: "PATCH",
    body: JSON.stringify({
      name: passwordName,
      userdata: userdata,
      value: passwordValue,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
