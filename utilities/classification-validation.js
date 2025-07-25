const { body, validationResult } = require("express-validator")
const utilities = require("./")

const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Please provide a classification name.")
      .isAlphanumeric()
      .withMessage("Classification name must contain only letters and numbers."),
  ]
}

const checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: errors.array(),
      message: null
    })
    return
  }
  next()
}

const inventoryRules = () => {
  return [
    body("inv_make").trim().notEmpty().withMessage("Please provide a make."),
    body("inv_model").trim().notEmpty().withMessage("Please provide a model."),
    body("inv_year").isInt({ min: 1900 }).withMessage("Enter a valid year."),
    body("inv_description").trim().notEmpty().withMessage("Provide a description."),
    body("inv_image").trim().notEmpty().withMessage("Provide an image path."),
    body("inv_thumbnail").trim().notEmpty().withMessage("Provide a thumbnail path."),
    body("inv_price").isFloat({ min: 0 }).withMessage("Enter a valid price."),
    body("inv_miles").isInt({ min: 0 }).withMessage("Enter a valid mileage."),
    body("inv_color").trim().notEmpty().withMessage("Provide a color."),
    body("classification_id").notEmpty().withMessage("Choose a classification.")
  ]
}

const checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList(req.body.classification_id)

  if (!errors.isEmpty()) {
    res.render("inventory/add-inventory", {
      title: "Add New Inventory Item",
      nav,
      classificationList,
      errors: errors.array(),
      message: null,
      ...req.body
    })
    return
  }
  next()
}


module.exports = {
  classificationRules,
  checkClassificationData,
  inventoryRules,
  checkInventoryData
}
