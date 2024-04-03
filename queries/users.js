const createUsersTableQuery = {
  name: "create-table-users",
  text: `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255),
      image VARCHAR(255),
      role VARCHAR(100)
  );`,
};
const fetchUsersQuery = {
  name: "fetch-users",
  text: `SELECT * FROM users`,
};
const fetchSingleUserQuery = (id) => {
  return {
    name: "fetch-single-event",
    text: `SELECT * FROM users WHERE id=$1`,
    values: [id],
  };
};
const createUserQuery = (body) => {
  return {
    name: "create-event",
    text: `INSERT INTO users (full_name, email, image, role) VALUES
      ($1, $2, $3, $4)`, // Using parameterized query to prevent SQL injection
    values: [body.full_name, body.email, body.image, body.role], // Passing values separately to prevent SQL injection
  };
};
const updateUserQuery = (uid, newData) => {
  return {
    name: "update-event",
    text: `UPDATE users SET full_name = $1, email = $2, image = $3, role = $4 WHERE id = $5`,
    values: [
      newData.full_name,
      newData.email,
      newData.image,
      newData.role,
      uid,
    ],
  };
};

const deleteUserQuery = (uid) => {
  return {
    name: "delete-event",
    text: "DELETE FROM users WHERE id = $1",
    values: [uid],
  };
};

module.exports = {
  createUsersTableQuery,
  fetchUsersQuery,
  fetchSingleUserQuery,
  createUserQuery,
  updateUserQuery,
  deleteUserQuery,
};
