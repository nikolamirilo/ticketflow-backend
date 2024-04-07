export const createUsersTableQuery = {
  name: "create-table-users",
  text: `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(100),
      gender VARCHAR(100),
      is_verified BOOLEAN,
      personal_id VARCHAR(100),
      tickets_sold INTEGER,
      is_reliable_seller BOOLEAN,
      bio TEXT,
      email VARCHAR(100),
      image VARCHAR(255)
  );`,
};
export const fetchUsersQuery = {
  name: "fetch-users",
  text: `SELECT 
  u.full_name,
  u.phone,
  u.gender,
  u.is_verified,
  u.personal_id,
  u.tickets_sold,
  u.is_reliable_seller,
  u.bio,
  u.email,
  u.image
FROM 
  users u
LEFT JOIN 
  offers o ON o.seller_uid = u.id
LEFT JOIN 
  events e ON o.event_id = e.id
GROUP BY 
  u.full_name, u.phone, u.gender, u.is_verified, u.personal_id, u.tickets_sold, 
  u.is_reliable_seller, u.bio, u.email, u.image;
`,
};

export const fetchSingleUserQuery = (id) => {
  return {
    name: "fetch-single-user",
    text: `SELECT * FROM users WHERE id=$1`,
    values: [id],
  };
};

export const createUserQuery = (body) => {
  return {
    name: "create-user",
    text: `INSERT INTO users (full_name, phone, gender, is_verified, personal_id, tickets_sold, is_reliable_seller, bio, email, image) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    values: [
      body.full_name,
      body.phone,
      body.gender,
      body.is_verified,
      body.personal_id,
      body.tickets_sold,
      body.is_reliable_seller,
      body.bio,
      body.email,
      body.image,
    ],
  };
};

export const updateUserQuery = (uid, newData) => {
  return {
    name: "update-user",
    text: `UPDATE users SET full_name = $1, phone = $2, gender = $3, is_verified = $4, personal_id = $5, tickets_sold = $6, is_reliable_seller = $7, bio = $8, email = $9, image = $10 WHERE id = $11`,
    values: [
      newData.full_name,
      newData.phone,
      newData.gender,
      newData.is_verified,
      newData.personal_id,
      newData.tickets_sold,
      newData.is_reliable_seller,
      newData.bio,
      newData.email,
      newData.image,
      uid,
    ],
  };
};

export const deleteUserQuery = (uid) => {
  return {
    name: "delete-user",
    text: "DELETE FROM users WHERE id = $1",
    values: [uid],
  };
};
