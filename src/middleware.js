export const localsMiddleWare = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "쫑기닷컴";
  res.locals.loggedInUser = req.session.user;
  console.log("!!! LOCALS:", res.locals);
  next();
};

export const loginOnlyMiddleWare = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }
  return res.redirect("/");
};

export const logOutOnlyMiddleWare = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  }
  return res.redirect("/");
};
