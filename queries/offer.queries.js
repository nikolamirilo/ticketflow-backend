export const createOffersTableQuery = {
  name: "create-offers-table",
  text: `CREATE TABLE IF NOT EXISTS offers (
      id SERIAL PRIMARY KEY,
      "event_id" INTEGER NOT NULL,
      "details" TEXT,
      "price" INTEGER,
      "seat_number" VARCHAR(100),
      "seat_area"  VARCHAR(100),
      "seller_uid" INTEGER NOT NULL,
      "status" VARCHAR(100),
      "customer_uid" INTEGER);`,
};
export const fetchOffersQuery = {
  name: "fetch-offers",
  text: `SELECT
      o.id,
      o.details,
      o.seat_number,
      o.seat_area,
      o.price,
      o.status,
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

export const fetchSingleOfferQuery = (id) => {
  return {
    name: "fetch-single-offer",
    text: `SELECT
      o.id,
      o.details,
      o.seat_number,
      o.seat_area,
      o.price,
      o.status,
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
export const fetchEventOffersQuery = (id) => {
  return {
    name: "fetch-event-offers",
    text: `SELECT
      o.id,
      o.details,
      o.seat_number,
      o.seat_area,
      o.price,
      o.status,
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
export const createOfferQuery = (body) => {
  return {
    name: "create-offer",
    text: `INSERT INTO offers (event_id, details, seat_number, seat_area, price, seller_uid, status, customer_uid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [
      body.event_id,
      body.details,
      body.seat_number,
      body.seat_area,
      body.price,
      body.seller_uid,
      body.status,
      body.customer_uid,
    ],
  };
};

export const updateOfferQuery = (offerId, newData) => {
  return {
    name: "update-offer",
    text: `UPDATE offers SET event_id = $1, details = $2, seat_number = $3, seat_area = $4, price = $5, seller_uid = $6, status = $7, customer_uid = $8 WHERE id = $9`,
    values: [
      newData.event_id,
      newData.details,
      newData.seat_number,
      newData.seat_area,
      newData.price,
      newData.seller_uid,
      newData.status,
      newData.customer_uid,
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
