const express = require("express")
const router = new express.Router()
const errorController = require("../controllers/errorController")
const utilities = require("../utilities")

// Route to trigger intentional server error
router.get(
  "/trigger-error",
  utilities.handleErrors(errorController.triggerError)
)

module.exports = router
