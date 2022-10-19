import bcrypt from "bcrypt";
import User from "../../models/User";

// 로그인
export const getLogin = (req, res) => {
  return res.render("users/login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exist!",
    });
  }
  // password가 맞는지 확인 ㅋㅋㅋ (왜 이걸 안함)
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    return res
      .status(500)
      .render("users/login", {
        pageTitle: "Login",
        errorMessage: "Wrong Password!",
      });
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
