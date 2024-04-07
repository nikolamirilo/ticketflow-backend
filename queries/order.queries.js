export const createOrdersTableQuery = {
  name: "create-orders-table",
  text: `CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      image VARCHAR(255),
      location VARCHAR(100),
      link VARCHAR(255),
      date VARCHAR(100),
      time VARCHAR(100),
      category VARCHAR(100));`,
};

export const deleteOrdersTableQuery = {
  name: "delete-orders-table",
  text: `DROP TABLE IF EXISTS orders`,
};

export const fetchOrdersQuery = {
  name: "fetch-orders",
  text: `SELECT * FROM orders`,
};
export function fetchCategoryOrdersQuery(category) {
  return {
    name: "fetch-orders",
    text: `SELECT * FROM orders WHERE category ILIKE '%' || $1 || '%'`,
    values: [category],
  };
}

export const fetchSingleOrderQuery = (id) => {
  return {
    name: "fetch-single-order",
    text: `SELECT * FROM orders WHERE id=$1`,
    values: [id],
  };
};
export const searchOrdersQuery = (title) => {
  return {
    name: "search-orders",
    text: `SELECT * FROM orders WHERE title ILIKE '%' || $1 || '%'`,
    values: [title],
  };
};

export const createOrderQuery = (order) => {
  return {
    name: "create-order",
    text: `INSERT INTO orders (title, image, location, link, date, time, category) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    values: [
      order.title,
      order.image,
      order.location,
      order.link,
      order.date,
      order.time,
      order.category,
    ],
  };
};

export const updateOrderQuery = (id, newData) => {
  return {
    name: "update-order",
    text: `UPDATE orders SET title = $1, image = $2, location = $3, link = $4, date = $5, time = $6 category = $7 WHERE id = $8`,
    values: [
      newData.title,
      newData.image,
      newData.location,
      newData.link,
      newData.date,
      newData.time,
      newData.category,
      id,
    ],
  };
};

export const deleteOrderQuery = (id) => {
  return {
    name: "delete-order",
    text: "DELETE FROM orders WHERE id = $1",
    values: [id],
  };
};
