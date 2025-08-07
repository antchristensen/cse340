const pool = require("../database/"); 

async function saveMessage(name, email, subject, body) {
  const sql = `
    INSERT INTO messages (name, email, subject, body)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await pool.query(sql, [name, email, subject, body]);
  return result.rows[0];
}

async function getMessages() {
  const sql = "SELECT * FROM messages ORDER BY created_at DESC;";
  const result = await pool.query(sql);
  return result.rows;
}

module.exports = { saveMessage, getMessages };
