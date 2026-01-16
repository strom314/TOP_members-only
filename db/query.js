const pool = require("./pool");

async function addUser(firstName, lastName, username, password, isAdmin) {
  await pool.query(
    "INSERT INTO users(first_name, last_name, username, password, admin) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, password, isAdmin]
  );
}

module.exports = { addUser };
