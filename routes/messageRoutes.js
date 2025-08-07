const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const validate = require("../utilities/account-validation"); 

router.get("/contact", messageController.showForm);
router.post("/contact", messageController.submitMessage);

// Protect admin route
router.get("/admin/messages", validate.checkManagerAccess, messageController.viewMessages);

module.exports = router;
