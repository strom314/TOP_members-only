const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(50),
last_name VARCHAR(50),
username VARCHAR(50),
password VARCHAR(255),
member BOOLEAN,
admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INT,
date VARCHAR(50),
title VARCHAR(50),
text VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

let needToPopulate = true;
async function main() {
  if (needToPopulate) {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.CONNECTION_STRING,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
    needToPopulate = false;
  }
}

module.exports = main;
