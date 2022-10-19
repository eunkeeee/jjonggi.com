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
  const user = await User.findOne({ _id });

  // pw 두번 적은거 같게 적어야함
  if (newPassword !== newPassword2) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Password confirmation does not match!",
    });
  }

  // 과거 비번이랑 바뀌어야 함
  const isSame = await bcrypt.compare(newPassword, user.password);
  if (isSame) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Please change the password!",
    });
  }

  // 기존 pw이 맞는지 확인
  const correctCurrentPassword = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!correctCurrentPassword) {
    return res.status(500).render("users/change-password", {
      pageTitle: "Change Password",
      errorMessage: "Please write correct current password!",
    });
  }

  // 새로운 pw를 저장하기
  user.password = newPassword;
  await user.save(); // save를 해야 pre save fn이 실행되며 pw가 hashing되어 저장됨
  return res.redirect("/users/logout");
};
