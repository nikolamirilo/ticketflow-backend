// const createOrdersTableQuery = {
//   text: `CREATE TABLE IF NOT EXISTS orders (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(255),
//       image VARCHAR(255),
//       location VARCHAR(100),
//       link VARCHAR(255),
//       date VARCHAR(100),
//       time VARCHAR(100),
//       category VARCHAR(100));`,
// };

// const deleteOrdersTableQuery = {
//   text: `DROP TABLE IF EXISTS orders`,
// };

// const fetchOrdersQuery = {
//   text: `SELECT * FROM orders`,
// };
// function fetchCategoryOrdersQuery(category) {
//   return {
//     text: `SELECT * FROM orders WHERE category ILIKE '%' || $1 || '%'`,
//     values: [category],
//   };
// }

// const fetchSingleOrderQuery = (id) => {
//   return {
//     text: `SELECT * FROM orders WHERE id=$1`,
//     values: [id],
//   };
// };
// const searchOrdersQuery = (title) => {
//   return {
//     text: `SELECT * FROM orders WHERE title ILIKE '%' || $1 || '%'`,
//     values: [title],
//   };
// };

// const createOrderQuery = (order) => {
//   return {
//     text: `INSERT INTO orders (title, image, location, link, date, time, category) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
//     values: [
//       order.title,
//       order.image,
//       order.location,
//       order.link,
//       order.date,
//       order.time,
//       order.category,
//     ],
//   };
// };

// const updateOrderQuery = (id, newData) => {
//   return {
//     text: `UPDATE orders SET title = $1, image = $2, location = $3, link = $4, date = $5, time = $6 category = $7 WHERE id = $8`,
//     values: [
//       newData.title,
//       newData.image,
//       newData.location,
//       newData.link,
//       newData.date,
//       newData.time,
//       newData.category,
//       id,
//     ],
//   };
// };

// const deleteOrderQuery = (id) => {
//   return {
//     text: "DELETE FROM orders WHERE id = $1",
//     values: [id],
//   };
// };
// module.s = {
//   createOrdersTableQuery,
//   deleteOrdersTableQuery,
//   fetchOrdersQuery,
//   fetchSingleOrderQuery,
//   searchOrdersQuery,
//   createOrderQuery,
//   updateOrderQuery,
//   deleteOrderQuery,
//   fetchCategoryOrdersQuery,
// };
