import bcrypt from "bcrypt";
import User from "../../models/User";

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
