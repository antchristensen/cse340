const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")

// Route for login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

module.exports = router
