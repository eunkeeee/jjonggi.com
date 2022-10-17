import Posting from "../models/Posting";

// Global Router의 Controller
export const home = async (req, res) => {
  try {
    const postings = await Posting.find({});
    return res.render("home", { pageTitle: "Home", postings });
  } catch (error) {
    console.log(error);
    return res.render("server-error", { error });
  }
};
export const showPosting = (req, res) => {
  const {
    params: { id },
  } = req;
  return res.render("showPosting", {
    pageTitle: `${id}번 포스팅 보는중`,
    postings: [],
  });
};

// Edit
export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const posting = postings[id - 1];
  return res.render("edit", { pageTitle: `${id}번 포스팅 수정중` });
};
export const postEdit = (req, res) => {
  const {
    params: { id },
    body: { contents },
  } = req;
  return res.redirect(`/postings/${id}`);
};
export const deletePosting = (req, res) => res.send("deletePosting");

// Upload
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "New Post" });
};
export const postUpload = async (req, res) => {
  const {
    body: { caption },
  } = req;
  const searchHashtags = req.body.caption.match(/#[^\s#]*/g);
  const hashtags = searchHashtags ? searchHashtags : null;
  try {
    await Posting.create({
      caption,
      hashtags,
      owner: "Eunkeee",
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "New Post",
      errorMessage: error._message,
    });
  }
};
