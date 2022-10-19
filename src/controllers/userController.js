export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = (req, res) => {
  const {
    body: { name, email, username, password, password2 },
  } = req;
  // 1. pw vs pw2
  if (password !== password2) {
    return res.render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match!",
    });
  }
  // 2. pw strength checker
  // 3. email, username 중복여부 체크
};

export const login = (req, res) => res.send("Login");

export const edit = (req, res) => res.send("Edit User");
export const deleteAccount = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("logout User");
export const see = (req, res) => res.send("see User");
