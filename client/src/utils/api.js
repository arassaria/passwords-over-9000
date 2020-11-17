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
