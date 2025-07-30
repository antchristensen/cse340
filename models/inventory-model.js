const pool = require("../database/")

/* ***************************
 *  Add New Inventory
 * ************************** */
async function addInventory(
  classification_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color
) {
  try {
    const sql =
      "INSERT INTO public.inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
    const data = await pool.query(sql, [
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

/* ***************************
 *  Get all Classifications
 * ************************** */
async function getClassifications() {
  try {
    const sql = "SELECT classification_id, classification_name FROM public.classification ORDER BY classification_name"
    const data = await pool.query(sql)
    return data.rows
  } catch (error) {
    console.error("model error: " + error)
  }
}

/* ***************************
 *  Get Inventory by Classification ID
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const sql = "SELECT * FROM public.inventory WHERE classification_id = $1"
    const data = await pool.query(sql, [classification_id])
    return data.rows
  } catch (error) {
    console.error("model error: " + error)
  }
}

/* ***************************
 *  Get Inventory by Inventory ID
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM public.inventory WHERE inv_id = $1"
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = {
  addInventory,
  updateInventory,
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById
}
