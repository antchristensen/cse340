// Needed Resources  
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/classification-validation") 
const authorizeInventory = require("../utilities/authorize-Inventory") // ✅ Import middleware

// Route to build inventory management view (protected)
router.get(
  "/",
  authorizeInventory,
  utilities.handleErrors(invController.buildManagement)
)

// Route to show the Add Classification form (protected)
router.get(
  "/add-classification",
  authorizeInventory,
  utilities.handleErrors(invController.buildAddClassification)
)

// Route to handle Add Classification form POST (protected)
router.post(
  "/add-classification",
  authorizeInventory,
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to build inventory by classification view (public)
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Route to build inventory detail view by inventory ID (public)
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildDetail)
)

// Show add inventory form (protected)
router.get(
  "/add-inventory",
  authorizeInventory,
  utilities.handleErrors(invController.buildAddInventory)
)

// Handle POST form data (protected)
router.post(
  "/add-inventory",
  authorizeInventory,
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to return inventory data as JSON for AJAX (protected)
router.get(
  "/getInventory/:classification_id",
  authorizeInventory,
  utilities.handleErrors(invController.getInventoryJSON)
)

// Route to display the edit inventory form (protected)
router.get(
  "/edit/:inv_id",
  authorizeInventory,
  utilities.handleErrors(invController.buildEditInventory)
)

// Route to handle inventory update (protected)
router.post(
  "/update",
  authorizeInventory,
  invValidate.inventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Delete Routes (protected)
router.get(
  "/delete/:inv_id",
  authorizeInventory,
  utilities.handleErrors(invController.buildDeleteConfirm)
)

router.post(
  "/delete",
  authorizeInventory,
  utilities.handleErrors(invController.deleteItem)
)

module.exports = router
