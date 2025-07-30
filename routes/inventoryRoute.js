// Needed Resources  
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/classification-validation") 

// Route to build inventory management view
router.get(
  "/",
  utilities.handleErrors(invController.buildManagement)
)

// Route to show the Add Classification form
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

// Route to handle Add Classification form POST
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Route to build inventory detail view by inventory ID
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildDetail)
)

// Show add inventory form
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

// Handle POST form data
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to return inventory data as JSON for AJAX
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)

// Route to display the edit inventory form
router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.buildEditInventory)
)



module.exports = router
