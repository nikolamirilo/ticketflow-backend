const createUsersTableQuery = {
  text: `CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(50),
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(100),
      gender VARCHAR(100),
      is_verified BOOLEAN,
      personal_id VARCHAR(100),
      tickets_sold INTEGER,
      is_reliable_seller BOOLEAN,
      bio TEXT,
      email VARCHAR(100),
      image VARCHAR(255));`,
};
const fetchUsersQuery = {
    text: `SELECT
            u.id,
            u.full_name,
            u.phone,
            u.gender,
            u.is_verified,
            u.personal_id,
            u.tickets_sold,
            u.is_reliable_seller,
            u.bio,
            u.email,
            u.image,
            COALESCE(
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', o.id,
                  'details', o.details,
                  'seat_number', o.seat_number,
                  'seat_area', o.seat_area,
                  'price', o.price,
                  'status', o.status,
                  'quantity', o.quantity,
                  'document_url', o.document_url,
                  'additional_data', JSON_BUILD_OBJECT(
                    'event', e,
                    'seller', s,
                    'customer', c
                  )
                )
              ) FILTER (WHERE o.id IS NOT NULL), '[]'
            ) AS offers
          FROM
            users u
          LEFT JOIN
            offers o ON o.seller_uid = u.id
          LEFT JOIN
            users s ON o.seller_uid = s.id
          LEFT JOIN
            users c ON o.customer_uid = c.id
          LEFT JOIN
            events e ON o.event_id = e.id
          GROUP BY
            u.id, u.full_name, u.phone, u.gender, u.is_verified, u.personal_id, u.tickets_sold, u.is_reliable_seller, u.bio, u.email, u.image;

`,
};

const fetchSingleUserQuery = (id) => {
  return {
    text: `SELECT
            u.id,
            u.full_name,
            u.phone,
            u.gender,
            u.is_verified,
            u.personal_id,
            u.tickets_sold,
            u.is_reliable_seller,
            u.bio,
            u.email,
            u.image,
            COALESCE(
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', o.id,
                  'details', o.details,
                  'seat_number', o.seat_number,
                  'seat_area', o.seat_area,
                  'price', o.price,
                  'status', o.status,
                  'quantity', o.quantity,
                  'document_url', o.document_url,
                  'additional_data', JSON_BUILD_OBJECT(
                    'event', e,
                    'seller', s,
                    'customer', c
                  )
                )
              ) FILTER (WHERE o.id IS NOT NULL), '[]'
            ) AS offers
          FROM
            users u
          LEFT JOIN
            offers o ON o.seller_uid = u.id
          LEFT JOIN
            users s ON o.seller_uid = s.id
          LEFT JOIN
            users c ON o.customer_uid = c.id
          LEFT JOIN
            events e ON o.event_id = e.id
          WHERE
            u.id = $1
          GROUP BY
            u.id, u.full_name, u.phone, u.gender, u.is_verified, u.personal_id, u.tickets_sold, u.is_reliable_seller, u.bio, u.email, u.image;
`,
    values: [id],
  };
};

const createUserQuery = (body) => {
  return {
    text: `INSERT INTO users (id, full_name, phone, gender, is_verified, personal_id, tickets_sold, is_reliable_seller, bio, email, image) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
    values: [
      body.id,
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

const updateUserQuery = (uid, newData) => {
  return {
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

const deleteUserQuery = (uid) => {
  return {
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
