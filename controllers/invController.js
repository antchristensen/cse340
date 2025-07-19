const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
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

/* ***************************
 *  Build inventory detail view by invId
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
  const invId = req.params.invId
  try {
    const data = await invModel.getInventoryById(invId)
    if (!data) {
      return res.status(404).send("Vehicle not found")
    }
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

module.exports = invCont
