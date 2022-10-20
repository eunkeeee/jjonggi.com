import Posting from "../../models/Posting";
import User from "../../models/User";

// Upload
export const getUpload = (req, res) => {
  return res.render("postings/upload", { pageTitle: "New Post" });
};
export const postUpload = async (req, res) => {
  const {
    body: { caption },
    files,
    session: {
      user: { _id },
    },
  } = req;
  let imgsUrl = [];
  files.forEach((element) => {
    imgsUrl.push(element.path);
  });
  try {
    const newPosting = await Posting.create({
      caption,
      imgsUrl,
      hashtags: Posting.formatHashtags(caption),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.postings.push(newPosting._id);
    user.save(); // pre save fn ... pw hashing 발생...
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("postings/upload", {
      pageTitle: "New Post",
      errorMessage: error._message,
    });
  }
};
