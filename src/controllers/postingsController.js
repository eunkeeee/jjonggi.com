export const showMainPostings = (req, res) => res.render("home");
export const search = (req, res) => res.send("Search");

export const showPosting = (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(id);
};
export const edit = (req, res) => res.render("edit");
export const deletePosting = (req, res) => res.send("deletePosting");
export const upload = (req, res) => res.send("upload");
