const createCartItemsTableQuery = {
    text: `CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) NOT NULL,
        offer_id INT NOT NULL,
        quantity INT NOT NULL
    );`
};

const addItemToCartQuery = (userId, offerId, quantity) => {
    return {
        text: `INSERT INTO cart_items(user_id, offer_id, quantity) VALUES($1, $2, $3);`,
        values: [userId, offerId, quantity]
    };
};

const fetchUserCartItemsQuery = (userId) => {
    return {
      text: `SELECT
                i.quantity,
              JSON_BUILD_OBJECT(
                'id', o.id,
                'details', o.details,
                'seat_number', o.seat_number,
                'seat_area', o.seat_area,
                'price', o.price,
                'status', o.status,
                'quantity', o.quantity,
                'files', o.files,
                'additional_data', JSON_BUILD_OBJECT(
                  'event', e,
                  'seller', s,
                  'customer', c
                )
              ) AS offer
            FROM
              cart_items i
            LEFT JOIN
              offers o ON i.offer_id = o.id
            LEFT JOIN
              users s ON o.seller_uid = s.id
            LEFT JOIN
              users c ON o.customer_uid = c.id
            LEFT JOIN
              events e ON o.event_id = e.id
            WHERE
              i.user_id = $1`,
      values: [userId]
    };
  };
  

const removeItemFromCartQuery = (itemId) => {
    return {
        text: `DELETE FROM cart_items WHERE id=$1;`,
        values: [itemId]
    };
};


module.exports = {
    fetchUserCartItemsQuery,
    createCartItemsTableQuery,
    addItemToCartQuery,
    removeItemFromCartQuery,
};
