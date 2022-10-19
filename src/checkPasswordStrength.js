export const checkPasswordStrength = (password) => {
  var strongRegex = new RegExp(
    "^(?=.{7,})((?=.*[A-Z])|(?=.*[a-z]))(?=.*[0-9]).$",
    "g"
  );
  if (false == strongRegex.test(password) || password.length < 8) {
    return false;
  }
  return true;
};
