import Posting from "../../models/Posting";

// Edit
export const getEdit = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.render("404error", { pageTitle: "Posting not found." });
  }
  if (String(_id) !== String(posting.owner)) {
    return res.status(403).redirect("/");
  }
  return res.render("postings/edit", { pageTitle: `Editing...`, posting });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
    body: { caption },
    session: {
      user: { _id },
    },
  } = req;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res
      .status(404)
      .render("404error", { pageTitle: "Posting not found." });
  }
  if (String(_id) !== String(posting.owner)) {
    return res.status(403).redirect("/");
  }
  await Posting.findByIdAndUpdate(id, {
    caption,
    imgsUrl: posting.imgsUrl,
    hashtags: Posting.formatHashtags(caption),
    updatedAt: Date.now(),
  });
  return res.redirect(`/postings/${id}`);
};
export const deletePosting = async (req, res) => {
  const {
    params: { id },
    session: {
      user: { _id },
    },
  } = req;
  const posting = await Posting.findById(id);
  if (!posting) {
    return res.render("404error", { pageTitle: "Posting not found!" });
  }
  if (String(_id) !== String(posting.owner)) {
    return res.status(403).redirect("/");
  }
  await Posting.findByIdAndDelete(id);
  return res.redirect("/");
};
