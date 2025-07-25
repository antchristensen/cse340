const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* View inventory by classification */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* View vehicle detail */
invCont.buildDetail = async function (req, res, next) {
  const invId = req.params.invId
  try {
    const data = await invModel.getInventoryById(invId)
    if (!data) return res.status(404).send("Vehicle not found")
    let nav = await utilities.getNav()
    const detailHTML = await utilities.buildDetailView(data)
    res.render("./inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      nav,
      detailHTML,
    })
  } catch (error) {
    next(error)
  }
}

/* Inventory management */
invCont.buildManagement = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message: req.flash("notice"),
    })
  } catch (error) {
    next(error)
  }
}

/* Show add classification form */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    message: req.flash("notice"),
    errors: null
  })
}

/* Handle add classification POST */
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)
  let nav = await utilities.getNav()

  if (result) {
    req.flash("notice", `${classification_name} was successfully added.`)
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message: req.flash("notice")
    })
  } else {
    req.flash("notice", "Sorry, adding the classification failed.")
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      message: req.flash("notice"),
      errors: null
    })
  }
}

/* Show add inventory form */
invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add New Inventory Item",
    nav,
    classificationList,
    message: req.flash("notice"),
    errors: null,
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "/images/vehicles/no-image.png",
    inv_thumbnail: "/images/vehicles/no-image-tn.png",
    inv_price: "",
    inv_miles: "",
    inv_color: ""
  })
}

/* Handle add inventory POST */
invCont.addInventory = async function (req, res, next) {
  const {
    classification_id, inv_make, inv_model, inv_year,
    inv_description, inv_image, inv_thumbnail,
    inv_price, inv_miles, inv_color
  } = req.body

  const result = await invModel.addInventory(
    classification_id, inv_make, inv_model, inv_year,
    inv_description, inv_image, inv_thumbnail,
    inv_price, inv_miles, inv_color
  )

  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList(classification_id)

  if (result) {
    req.flash("notice", "Inventory item successfully added.")
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      message: req.flash("notice")
    })
  } else {
    req.flash("notice", "Failed to add inventory item.")
    res.render("inventory/add-inventory", {
      title: "Add New Inventory Item",
      nav,
      classificationList,
      message: req.flash("notice"),
      errors: null,
      ...req.body 
    })
  }
}

module.exports = invCont
