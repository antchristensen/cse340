// routes/inventory.js
const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")
const authorizeInventory = require("../utilities/authorize-Inventory")

// Protect management view with middleware
router.get("/", authorizeInventory, invController.buildManagement)

module.exports = router
