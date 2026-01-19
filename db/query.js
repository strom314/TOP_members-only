const pool = require("./pool");

async function addUser(firstName, lastName, username, password, isAdmin) {
  await pool.query(
    "INSERT INTO users(first_name, last_name, username, password, admin) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, isAdmin]
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
  await pool.query(
    "INSERT INTO messages(user_id, title, text) VALUES ($1, $2, $3)",
    [userId, title, text]
  );
}

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

module.exports = {
  addUser,
  findUserByUsername,
  findUserById,
  addMessage,
  getAllMessages,
};
