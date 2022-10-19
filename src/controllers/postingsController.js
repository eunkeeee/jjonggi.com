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

// search
export const search = async (req, res) => {
  // hashtag 서칭
  const {
    query: { keyword }, // form의 get method로 URL에 올린걸 받아옴
  } = req;
  if (!keyword) {
    return res.redirect("/");
  }
  return res.render("search", { pageTitle: "Search" });
};
