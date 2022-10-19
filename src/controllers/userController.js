export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = (req, res) => {
  const {
    body: { name, email, username, password },
  } = req;
  return res.send(`${name},${email},${username},${password}`);
};
export const login = (req, res) => res.send("Login");

export const edit = (req, res) => res.send("Edit User");
export const deleteAccount = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("logout User");
export const see = (req, res) => res.send("see User");
