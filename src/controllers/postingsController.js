import Posting from "../models/Posting";

// Global Router의 Controller
export const home = async (req, res) => {
  try {
    const postings = await Posting.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", postings });
  } catch (error) {
    console.log(error);
    return res.render("server-error", { error });
  }
};
export const showPosting = async (req, res) => {
  const {
    params: { id },
  } = req;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.render("404error", { pageTitle: "Posting not found." });
  }
  return res.render("showPosting", {
    pageTitle: posting.owner,
    posting,
  });
};

// Edit
export const getEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.render("404error", { pageTitle: "Posting not found." });
  }
  return res.render("edit", { pageTitle: `Editing...`, posting });
};
export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { caption },
  } = req;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.render("404error", { pageTitle: "Posting not found." });
  }
  await Posting.findByIdAndUpdate(id, {
    caption,
    hashtags: Posting.formatHashtags(caption),
    updatedAt: Date.now(),
  });
  return res.redirect(`/postings/${id}`);
};
export const deletePosting = async (req, res) => {
  const {
    params: { id },
  } = req;
  await Posting.findByIdAndDelete(id);
  return res.redirect("/");
};

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
    return res.render("upload", {
      pageTitle: "New Post",
      errorMessage: error._message,
    });
  }
};

// search
export const search = (req, res) => {};
