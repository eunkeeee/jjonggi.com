export const showMainPostings = (req, res) => {
  const postings = [
    { id: 1, title: "은기의 브이로그", contents: "아무것도 없음" },
    { id: 2, title: "지훈이의 브이로그", contents: "아직 아무것도 없음" },
    { id: 3, title: "초키의 브이로그", contents: "아무것도 없음" },
  ];
  return res.render("home", { pageTitle: "메인", postings });
};
export const search = (req, res) => res.send("Search");

export const showPosting = (req, res) => {
  const {
    params: { id },
  } = req;
  return res.render("posting");
};
export const edit = (req, res) => res.render("edit");
export const deletePosting = (req, res) => res.send("deletePosting");
export const upload = (req, res) => res.send("upload");
