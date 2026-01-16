const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(50),
last_name VARCHAR(50),
username VARCHAR(50),
password VARCHAR(50),
member BOOLEAN,
admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INT,
date INT,
title VARCHAR(50),
text VARCHAR(255)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

module.exports = main;
