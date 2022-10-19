import Posting from "../models/Posting";
import User from "../models/User";

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
  const owner = await User.findById(posting.owner);
  if (!posting) {
    return res.render("404error", { pageTitle: "Posting not found." });
  }
  return res.render("postings/showPosting", {
    pageTitle: `${owner.name}님의 게시글`,
    posting,
    owner,
  });
};

// search
export const search = async (req, res) => {
  // hashtag 서칭
  const {
    query: { keyword }, // form의 get method로 URL에 올린걸 받아옴
  } = req;
  // if (!keyword) {
  //   return res.redirect("/");
  // }
  return res.render("postings/search", { pageTitle: "Search" });
};
