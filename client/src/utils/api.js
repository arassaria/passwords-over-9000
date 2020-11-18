export async function getPasswordNames() {
  const result = await fetch("/api/passwords");
  const passwordNames = await result.json();
  return passwordNames;
}

export async function getPassword(name) {
  const result = await fetch(`/api/passwords/${name}`);
  const password = await result.json();
  return password;
}

export async function deletePassword(name) {
  await fetch(`/api/passwords/${name}`, {
    method: "DELETE",
  });
}

export async function createNewPassword(
  passwordName,
  newUserdata,
  newPasswordValue
) {
  await fetch(`/api/passwords`, {
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
  await fetch(`/api/passwords/${passwordName}`, {
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
