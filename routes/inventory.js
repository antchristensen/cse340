// routes/inventory.js
const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

router.get("/", invController.buildManagement)

module.exports = router
