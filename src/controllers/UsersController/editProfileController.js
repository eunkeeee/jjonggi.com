import User from "../../models/User";

// 회원 정보 수정
export const getEdit = (req, res) => {
  return res.render("users/edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, email: sessionEmail, username: sessionUsername, avatarUrl },
    },
    body: { name, email, username },
    file,
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
      return res.status(400).render("users/edit-profile", {
        pageTitle: "Edit Profile",
        errorMessage: "This username/email is already taken.",
      });
    }
  }
  // 2. DB에서 찾아 변경해주기
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { name, email, username, avatarUrl: file ? file.path : avatarUrl },
    { new: true } // You should set the new option to true to return the document after update was applied.
  );
  // session에도 update
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
};
