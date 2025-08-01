const jwt = require("jsonwebtoken")

/**
 * Middleware to restrict inventory access to Employee or Admin only
 */
const authorizeInventory = (req, res, next) => {
  const token = req.cookies.jwt

  // If no token, redirect to login
  if (!token) {
    req.flash("notice", "You must be logged in to access this page.")
    return res.redirect("/account/login")
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // Check account type
    if (decoded.account_type === "Employee" || decoded.account_type === "Admin") {
      return next()
    } else {
      req.flash("notice", "You do not have permission to access this page.")
      return res.redirect("/account/login")
    }
  } catch (error) {
    req.flash("notice", "Authentication failed. Please log in again.")
    return res.redirect("/account/login")
  }
}

module.exports = authorizeInventory
