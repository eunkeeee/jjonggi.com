import { passwordStrength } from "check-password-strength";

import User from "../models/User";

// 회원가입
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const {
    body: { name, email, username, password, password2 },
  } = req;

  // 1. pw vs pw2
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match!",
    });
  }
  // 2. pw strength checker
  if (passwordStrength(password).id <= 0) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage:
        "Your password must contain at least 6 characters with uppercase, and number.",
    });
  }

  // 3. email, username 중복여부 체크
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username/email is already taken",
    });
  }

  // 다 통과했으면 회원가입
  try {
    await User.create({
      email,
      username,
      password,
      name,
    });
    return res.redirect("/login");
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle: "Join", errorMessage: error._message });
  }
};

// 로그인
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exist!",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  req.session.user = null;
  req.session.loggedIn = false;
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, username },
  } = req;
  // 1. email, username은 unique해야함
  // 2. DB에서 찾아 변경해주기
  await User.findByIdAndUpdate(_id, { name, email, username });
  // session에도 update
  req.session.user = { ...req.session.user, name, email, username };
  return res.redirect("/users/edit");
};
export const deleteAccount = (req, res) => res.send("Delete User");
export const see = (req, res) => res.send("see User");
