import User from "../../models/User";
import Posting from "../../models/Posting";

export const see = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id).populate("postings");
  console.log("~~~", user);
  if (!user) {
    return res.render("404error", { pageTitle: "User not found!" });
  }
  return res.render("users/profile", { pageTitle: user.name, user });
};
