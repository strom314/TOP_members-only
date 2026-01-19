const pool = require("./pool");

async function addUser(firstName, lastName, username, password) {
  await pool.query(
    "INSERT INTO users(first_name, last_name, username, password, admin) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, false],
  );
}

async function findUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function addMessage(userId, title, text) {
  const date = new Date();
  await pool.query(
    "INSERT INTO messages(user_id, date, title, text) VALUES ($1, $2, $3, $4)",
    [userId, date.toLocaleDateString(), title, text],
  );
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function setAdmin(userId) {
  await pool.query("UPDATE users SET admin = $1 WHERE id = $2", [true, userId]);
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

module.exports = {
  addUser,
  findUserByUsername,
  findUserById,
  addMessage,
  getAllMessages,
  setAdmin,
  deleteMessage,
};
