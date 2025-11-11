export function adminPage(req, res) {
  if (!req.session.userId || req.session.role !== "admin") {
    return res.redirect("/login");
  }

  res.render("admin");
}
