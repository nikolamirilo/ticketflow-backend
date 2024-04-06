export const createUsersTableQuery = {
  name: "create-table-users",
  text: `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(100),
      gender VARCHAR(100),
      isVerified BOOLEAN,
      personal_id VARCHAR(100),
      sold_number INTEGER,
      isReliableSeller BOOLEAN,
      bio TEXT,
      email VARCHAR(100),
      image VARCHAR(255),
      role VARCHAR(100)
  );`,
};

export const fetchUsersQuery = {
  name: "fetch-users",
  text: `SELECT 
  u.full_name,
  u.phone,
  u.gender,
  u.isVerified,
  u.personal_id,
  u.sold_number,
  u.isReliableSeller,
  u.bio,
  u.email,
  u.image,
  u.role,
  COALESCE(
      JSON_AGG(
          JSON_BUILD_OBJECT(
              'id', o.id,
              'details', o.details,
              'seat_number', o.seat_number,
              'seat_area', o.seat_area,
              'price', o.price,
              'event', JSON_BUILD_OBJECT(
                  'id', e.id,
                  'title', e.title,
                  'description', e.description,
                  'image', e.images,
                  'category', e.category,
                  'location', e.location,
                  'date', e.date,
              )
          )
      ) FILTER (WHERE o.id IS NOT NULL),
      '[]'
  ) AS offers
FROM 
  users u
LEFT JOIN 
  offers o ON o.seller_uid = u.id
LEFT JOIN 
  events e ON o.event_id = e.id
GROUP BY 
  u.full_name, u.phone, u.gender, u.isVerified, u.personal_id, u.sold_number, 
  u.isReliableSeller, u.bio, u.email, u.image, u.role;
`,
};
export const fetchSingleUserQuery = (id) => {
  return {
    name: "fetch-single-event",
    text: `SELECT * FROM users WHERE id=$1`,
    values: [id],
  };
};
export const createUserQuery = (body) => {
  return {
    name: "create-event",
    text: `INSERT INTO users (full_name, email, image, role) VALUES
      ($1, $2, $3, $4)`, // Using parameterized query to prevent SQL injection
    values: [body.full_name, body.email, body.image, body.role], // Passing values separately to prevent SQL injection
  };
};
export const updateUserQuery = (uid, newData) => {
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

export const deleteUserQuery = (uid) => {
  return {
    name: "delete-event",
    text: "DELETE FROM users WHERE id = $1",
    values: [uid],
  };
};
