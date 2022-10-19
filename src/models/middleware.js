export const localsMiddleWare = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "쫑기닷컴";
  res.locals.loggedInUser = req.session.user;
  console.log("!!! LOCALS:", res.locals);
  next();
};
