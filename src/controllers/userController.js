import { passwordStrength } from "check-password-strength";

import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
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
  if (passwordStrength(password).id <= 0) {
    return res.render("join", {
      pageTitle: "Join",
      errorMessage:
        "Your password must contain at least 6 characters with uppercase, and number.",
    });
  }

  // 3. email, username 중복여부 체크
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email is already taken",
    });
  }

  // 다 통과했으면 회원가입
  await User.create({
    email,
    username,
    password,
    name,
  });
  return res.redirect("/login");
};

export const login = (req, res) => res.send("Login");

export const edit = (req, res) => res.send("Edit User");
export const deleteAccount = (req, res) => res.send("Delete User");
export const logout = (req, res) => res.send("logout User");
export const see = (req, res) => res.send("see User");
