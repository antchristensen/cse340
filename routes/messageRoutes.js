const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/contact", messageController.showForm);
router.post("/contact", messageController.submitMessage);
router.get("/admin/messages", messageController.viewMessages);

module.exports = router;
