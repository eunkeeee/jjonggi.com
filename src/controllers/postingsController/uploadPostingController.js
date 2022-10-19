import Posting from "../../models/Posting";

// Upload
export const getUpload = (req, res) => {
  return res.render("postings/upload", { pageTitle: "New Post" });
};
export const postUpload = async (req, res) => {
  const {
    body: { caption },
    files,
  } = req;
  let imgsUrl = [];
  files.forEach((element) => {
    imgsUrl.push(element.path);
  });
  try {
    await Posting.create({
      caption,
      imgsUrl,
      hashtags: Posting.formatHashtags(caption),
      owner: "Eunkeee",
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("postings/upload", {
      pageTitle: "New Post",
      errorMessage: error._message,
    });
  }
  res.end();
};
