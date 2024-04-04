export const createOffersTableQuery = {
  name: "create-table-offers",
  text: `CREATE TABLE IF NOT EXISTS offers (
      id SERIAL PRIMARY KEY,
      event_id INTEGER NOT NULL,
      details TEXT,
      price INTEGER,
      seller_uid INTEGER NOT NULL
);`,
};
export const fetchOffersQuery = {
  name: "fetch-offers",
  text: `SELECT 
  o.id,
  o.details,
  e.category,
  o.price,
  JSON_BUILD_OBJECT('event', e, 'user', u) AS additional_data
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
    text: `INSERT INTO offers (event_id, details, price, seller_uid) VALUES ($1, $2, $3, $4)`,
    values: [body.event_id, body.details, body.price, body.seller_uid],
  };
};

export const updateOfferQuery = (offerId, newData) => {
  return {
    name: "update-offer",
    text: `UPDATE offers SET event_id = $1, details = $2, price = $3, seller_uid = $4 WHERE id = $5`,
    values: [
      newData.event_id,
      newData.details,
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
