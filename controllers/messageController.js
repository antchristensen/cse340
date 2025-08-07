const messageModel = require("../models/messageModel");
const utilities = require("../utilities/");

async function showForm(req, res) {
  const nav = await utilities.getNav();
  res.render("contact", {
    title: "Contact Us",
    nav,
    success: null,
    error: null
  });
}

async function submitMessage(req, res) {
  const nav = await utilities.getNav();
  try {
    const { name, email, subject, body } = req.body;

    if (!name || !email || !subject || !body) {
      return res.render("contact", {
        title: "Contact Us",
        nav,
        success: null,
        error: "All fields are required.",
      });
    }

    await messageModel.saveMessage(name, email, subject, body);
    res.render("contact", {
      title: "Contact Us",
      nav,
      success: "Message sent!",
      error: null
    });
  } catch (err) {
    console.error("Error submitting message:", err);
    res.render("contact", {
      title: "Contact Us",
      nav,
      success: null,
      error: "Something went wrong."
    });
  }
}

async function viewMessages(req, res) {
  const nav = await utilities.getNav();
  try {
    const messages = await messageModel.getMessages();
    res.render("admin/messages", {
      title: "Messages",
      nav,
      messages
    });
  } catch (err) {
    console.error("Error loading messages:", err);
    res.render("admin/messages", {
      title: "Messages",
      nav,
      messages: [],
      error: "Could not load messages."
    });
  }
}

module.exports = { showForm, submitMessage, viewMessages };
