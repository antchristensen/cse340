const { Pool } = require("pg")
require("dotenv").config()

/* 
 * Connection Pool with SSL Always On
 * Works for both Development and Production
 */
let pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Development: Log queries for debugging
if (process.env.NODE_ENV === "development") {
  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params)
        console.log("executed query", { text })
        return res
      } catch (error) {
        console.error("error in query", { text })
        throw error
      }
    },
  }
} else {
  // Production: Use pool directly
  module.exports = pool
}
