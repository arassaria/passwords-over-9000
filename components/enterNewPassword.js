const { setPassword } = require("../lib/password");
const {
  setNewPasswordName,
  setNewUserdata,
  getNewPasswordValue,
} = require("../lib/questions");

async function enterNewPassword(passwordSafeKeys) {
  const passwordName = await setNewPasswordName();
  const newUserdata = await setNewUserdata();
  const newPasswordValue = await getNewPasswordValue();
  if (passwordSafeKeys.includes(passwordName)) {
    console.log("Password name already in use.");
    await enterNewPassword();
    return;
  }
  await setPassword(passwordName, newUserdata, newPasswordValue);
}

exports.enterNewPassword = enterNewPassword;
