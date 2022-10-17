import Posting from "../models/Posting";

// Global Router의 Controller
export const showMainPostings = (req, res) => {
  console.log("home");
  Posting.find({}, (error, postings) => {
    console.log("errors:", error);
    console.log("postings:", postings);
  });
  return res.render("home", { pageTitle: "메인", postings: [] });
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
  return res.render("upload", { pageTitle: "새 게시물" });
};
export const postUpload = (req, res) => {
  const {
    body: { contents },
  } = req;
  return res.redirect("/");
};
