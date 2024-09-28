const sql = require('../config/db');

// create new user
const createUser = async (username, email, password, role) => {
  return await sql`INSERT INTO users (username, email, password, role) VALUES (${username}, ${email}, ${password}, ${role}) RETURNING *`;
};

// login existing user
const findUserByEmail = async (email) => {
  return await sql`SELECT * FROM users WHERE email = ${email}`;
};

module.exports = { createUser, findUserByEmail };
