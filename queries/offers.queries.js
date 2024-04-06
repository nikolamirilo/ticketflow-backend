export const createOffersTableQuery = {
  name: "create-offers-table",
  text: `CREATE TABLE IF NOT EXISTS offers (
      id SERIAL PRIMARY KEY,
      event_id INTEGER NOT NULL,
      details TEXT,
      price INTEGER,
      seat_number VARCHAR(100),
      seat_area  VARCHAR(100),
      seller_uid INTEGER NOT NULL
);`,
};
export const fetchOffersQuery = {
  name: "fetch-offers",
  text: `SELECT
    o.id,
    o.details,
    o.seat_number,
    o.seat_area,
    e.category,
    o.price,
    JSON_BUILD_OBJECT('event', e, 'seller', u) AS additional_data
  FROM
    offers o
  LEFT JOIN
    users u ON o.seller_uid = u.id
  LEFT JOIN
    events e ON o.event_id = e.id;
`,
};

export const fetchSingleOfferQuery = (id) => {
  return {
    name: "fetch-single-offer",
    text: `SELECT 
      o.id,
      o.details,
      o.seat_number,
      o.seat_area,
      e.category,
      o.price,
      JSON_BUILD_OBJECT('event', e, 'user', u) AS additional_data
    FROM 
      offers o 
    LEFT JOIN 
      users u ON o.seller_uid = u.id
    LEFT JOIN 
      events e ON o.event_id = e.id
    WHERE 
      o.id=$1;`,
    values: [id],
  };
};
export const createOfferQuery = (body) => {
  return {
    name: "create-offer",
    text: `INSERT INTO offers (event_id, details, seat_number, seat_area, price, seller_uid) VALUES ($1, $2, $3, $4, $5, $6)`,
    values: [
      body.event_id,
      body.details,
      body.seat_number,
      body.seat_area,
      body.price,
      body.seller_uid,
    ],
  };
};

export const updateOfferQuery = (offerId, newData) => {
  return {
    name: "update-offer",
    text: `UPDATE offers SET event_id = $1, details = $2, seat_number = $4, seat_area = $5, price = $6, seller_uid = $7 WHERE id = $8`,
    values: [
      newData.event_id,
      newData.details,
      newData.seat_number,
      newData.seat_area,
      newData.price,
      newData.seller_uid,
      offerId,
    ],
  };
};

export const deleteOfferQuery = (id) => {
  return {
    name: "delete-offer",
    text: "DELETE FROM offers WHERE id = $1",
    values: [id],
  };
};
