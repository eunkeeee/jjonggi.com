import Posting from "../../models/Posting";

// Upload
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "New Post" });
};
export const postUpload = async (req, res) => {
  const {
    body: { caption },
  } = req;
  try {
    await Posting.create({
      caption,
      hashtags: Posting.formatHashtags(caption),
      owner: "Eunkeee",
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "New Post",
      errorMessage: error._message,
    });
  }
};
