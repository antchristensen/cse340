const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

// Default account management view (protected)
router.get(
  "/",
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildAccountManagement)
)

// Route for login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

// Route for registration view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt with controller
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route to build Update Account Information view
router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateAccount)
)

// Handle Account Information Update
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateAccountRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

// Handle Password Change
router.post(
  "/change-password",
  utilities.checkLogin,
  regValidate.passwordChangeRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.changePassword)
)

// Handle Logout
router.get(
  "/logout",
  utilities.handleErrors(accountController.logoutAccount)
)

module.exports = router
