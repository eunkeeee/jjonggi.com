import bcrypt from "bcrypt";
import User from "../models/User";
import { passwordStrength } from "check-password-strength";

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
  // password가 맞는지 확인 ㅋㅋㅋ (왜 이걸 안함)
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return res
      .status(500)
      .render("login", { pageTitle: "Login", errorMessage: "Wrong Password!" });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

// 로그아웃
export const logout = (req, res) => {
  req.session.user = null;
  req.session.loggedIn = false;
  return res.redirect("/");
};

// 회원 정보 수정
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, email: sessionEmail, username: sessionUsername },
    },
    body: { name, email, username },
  } = req;
  // 1. email, username은 unique해야함
  let takeParams = [];
  if (sessionEmail !== email) {
    takeParams.push({ email });
  }
  if (sessionUsername !== username) {
    takeParams.push({ username });
  }
  if (takeParams.length > 0) {
    const foundUser = await User.findOne({ $or: takeParams });
    if (foundUser && foundUser._id.toString() !== _id) {
      return res.status(400).render("edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This username/email is already taken.",
      });
    }
  }
  // 2. DB에서 찾아 변경해주기
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { name, email, username },
    { new: true }
  );
  // session에도 update
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};

// 비밀번호 변경
export const getChangePassword = (req, res) => {
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { currentPassword, newPassword, newPassword2 },
  } = req;
  const currentUser = await User.findOne({ _id });
  const { name, username, email, password: hashedPassword } = currentUser;
  if (newPassword !== newPassword2) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Password confirmation does not match!",
    });
  }
  console.log("PW 두개는 서로 같음");
  // 기존 pw이 맞는지 확인
  const correctCurrentPassword = await bcrypt.compare(
    currentPassword,
    hashedPassword
  );
  console.log("이전 PW도 맞췄음");
  console.log("내가 적은거:", currentPassword);
  console.log("DB에 저장된거:", hashedPassword);
  if (!correctCurrentPassword) {
    return res.status(500).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Please write correct current password!",
    });
  }
  // 새로운 pw를 저장하기
  const updatedUser = await User.findByIdAndUpdate(_id, {
    name,
    username,
    email,
    password: newPassword,
  });
  console.log("디비에 업데이트완료");
  req.session.user = updatedUser;
  console.log("세션도 업데이트 완료");
  return res.redirect("/");
};

export const deleteAccount = (req, res) => res.send("Delete User");
export const see = (req, res) => res.send("see User");
