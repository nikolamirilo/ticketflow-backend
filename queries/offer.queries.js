const createOffersTableQuery = {
  text: `CREATE TABLE IF NOT EXISTS offers (
      id SERIAL PRIMARY KEY,
      event_id INTEGER,
      details TEXT,
      price INTEGER,
      seat_number VARCHAR(100),
      seat_area  VARCHAR(100),
      seller_uid VARCHAR(50) NOT NULL,
      status VARCHAR(100),
      customer_uid VARCHAR(50),
      quantity INTEGER NOT NULL,
      document_url VARCHAR(2083)
    );`,
};

const fetchOffersQuery = {
  text: `SELECT
      o.id,
      o.details,
      o.seat_number,
      o.seat_area,
      o.price,
      o.status,
      o.quantity,
      o.document_url,
      JSON_BUILD_OBJECT('event', e, 'seller', s, 'customer', c) AS additional_data
    FROM
      offers o
    LEFT JOIN
      users s ON o.seller_uid = s.id
    LEFT JOIN
      users c ON o.customer_uid = c.id
    LEFT JOIN
      events e ON o.event_id = e.id;
`,
};

const fetchSingleOfferQuery = (id) => {
  return {
    text: `SELECT
      o.id,
      o.details,
      o.seat_number,
      o.seat_area,
      o.price,
      o.status,
      o.quantity,
      o.document_url,
      JSON_BUILD_OBJECT('event', e, 'seller', s, 'customer', c) AS additional_data
    FROM
      offers o
    LEFT JOIN
      users s ON o.seller_uid = s.id
    LEFT JOIN
      users c ON o.customer_uid = c.id
    LEFT JOIN
      events e ON o.event_id = e.id
    WHERE 
      o.id=$1;`,
    values: [id],
  };
};
const fetchEventOffersQuery = (id) => {
  return {
    text: `SELECT
      o.id,
      o.details,
      o.seat_number,
      o.seat_area,
      o.price,
      o.status,
      o.quantity,
      o.document_url,
      JSON_BUILD_OBJECT('event', e, 'seller', s, 'customer', c) AS additional_data
    FROM
      offers o
    LEFT JOIN
      users s ON o.seller_uid = s.id
    LEFT JOIN
      users c ON o.customer_uid = c.id
    LEFT JOIN
      events e ON o.event_id = e.id
    WHERE 
      o.event_id = $1;`,
    values: [id],
  };
};
const createOfferQuery = (body) => {
  return {
    text: `INSERT INTO offers (event_id, details, seat_number, seat_area, price, seller_uid, status, customer_uid, quantity, document_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    values: [
      body.event_id,
      body.details,
      body.seat_number,
      body.seat_area,
      body.price,
      body.seller_uid,
      body.status,
      body.customer_uid,
      body.quantity,
      body.document_url
    ],
  };
};

const updateOfferQuery = (offerId, newData) => {
  return {
    text: `UPDATE offers SET event_id = $1, details = $2, seat_number = $3, seat_area = $4, price = $5, seller_uid = $6, status = $7, customer_uid = $8, quantity = $9, document_url=$10 WHERE id = $10`,
    values: [
      newData.event_id,
      newData.details,
      newData.seat_number,
      newData.seat_area,
      newData.price,
      newData.seller_uid,
      newData.status,
      newData.customer_uid,
      newData.quantity,
      newData.document_url,
      offerId,
    ],
  };
};

const deleteOfferQuery = (id) => {
  return {
    text: "DELETE FROM offers WHERE id = $1",
    values: [id],
  };
};

module.exports = {
  createOffersTableQuery,
  fetchOffersQuery,
  fetchSingleOfferQuery,
  fetchEventOffersQuery,
  createOfferQuery,
  updateOfferQuery,
  deleteOfferQuery,
};
