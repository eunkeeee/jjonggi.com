import Posting from "../../models/Posting";

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
    return res
      .status(404)
      .render("404error", { pageTitle: "Posting not found." });
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
