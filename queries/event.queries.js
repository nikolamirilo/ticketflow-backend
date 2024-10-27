const importUidQuery = {
  text: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
};

const createEventsTableQuery = {
  text: `CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image VARCHAR(255),
    location VARCHAR(100),
    link VARCHAR(255),
    date VARCHAR(100),
    time VARCHAR(100),
    category VARCHAR(100));`,
};

const deleteEventsTableQuery = {
  text: `DROP TABLE IF EXISTS events`,
};

const fetchEventsQuery = {
  text: `SELECT * FROM events;`,
};

function fetchCountCategoryEvents(category) {
  return {
    text: "SELECT COUNT(*) FROM events WHERE category = $1;",
    values: [category],
  };
}
function fetchCategoryEventsQuery(category, page) {
  const offset = (Number(page) - 1) * 10;
  return {
    text: `SELECT * FROM events WHERE category ILIKE '%' || $1 || '%' LIMIT 10 OFFSET ${offset};`,
    values: [category],
  };
}
function fetchFilterEventsQuery(filter) {
  return {
    text: `SELECT * FROM events WHERE
    title ILIKE '%' || $1 || '%' 
    AND location ILIKE '%' || $2 || '%' 
    AND date ILIKE '%' || $3 || '%' 
    AND category ILIKE '%' || $4 || '%'
   `,
    values: [filter.title, filter.location, filter.date, filter.category],
  };
}

const fetchSingleEventQuery = (id) => {
  return {
    text: `SELECT * FROM events WHERE id = $1`,
    values: [id],
  };
};

const createEventQuery = (event) => {
  return {
    text: `INSERT INTO events (title, image, location, link, date, time, category) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    values: [
      event.title,
      event.image,
      event.location,
      event.link,
      event.date,
      event.time,
      event.category,
    ],
  };
};

const updateEventQuery = (id, newData) => {
  return {
    text: `UPDATE events SET title = $1, image = $2, location = $3, link = $4, date = $5, time = $6 category = $7 WHERE id = $8`,
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

const deleteEventQuery = (id) => {
  return {
    text: "DELETE FROM events WHERE id = $1",
    values: [id],
  };
};

module.exports = {
  importUidQuery,
  createEventsTableQuery,
  deleteEventsTableQuery,
  fetchEventsQuery,
  fetchCountCategoryEvents,
  fetchSingleEventQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
  fetchCategoryEventsQuery,
  fetchFilterEventsQuery,
};
