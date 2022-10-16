let postings = [
  { id: 1, contents: "아무것도 없음", createdAt: new Date() },
  { id: 2, contents: "아직 아무것도 없음", createdAt: new Date() },
  { id: 3, contents: "아무것도 없음", createdAt: new Date() },
];

// Global Router의 Controller
export const showMainPostings = (req, res) => {
  return res.render("home", { pageTitle: "메인", postings });
};
export const showPosting = (req, res) => {
  const {
    params: { id },
  } = req;
  const posting = postings[id - 1];
  return res.render("showPosting", {
    pageTitle: `${id}번 포스팅 보는중`,
    posting,
  });
};

// Edit
export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const posting = postings[id - 1];
  return res.render("edit", { pageTitle: `${id}번 포스팅 수정중`, posting });
};
export const postEdit = (req, res) => {
  const {
    params: { id },
    body: { contents },
  } = req;
  postings[id - 1].contents = contents;
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
  const newPosting = {
    id: 4,
    contents,
    createdAt: new Date(),
  };
  postings.push(newPosting);
  return res.redirect("/");
};
