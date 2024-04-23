export const createEventsTableQuery = {
  name: "create-events-table",
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

export const deleteEventsTableQuery = {
  name: "delete-events-table",
  text: `DROP TABLE IF EXISTS events`,
};

export const fetchEventsQuery = {
  name: "fetch-events",
  text: `SELECT * FROM events`,
};
export function fetchCategoryEventsQuery(category) {
  return {
    name: "fetch-category-events",
    text: `SELECT * FROM events WHERE category ILIKE '%' || $1 || '%'`,
    values: [category],
  };
}

export const fetchSingleEventQuery = (id) => {
  return {
    name: "fetch-single-event",
    text: `SELECT * FROM events WHERE id=$1`,
    values: [id],
  };
};
export const searchEventsQuery = (title) => {
  return {
    name: "search-events",
    text: `SELECT * FROM events WHERE title ILIKE '%' || $1 || '%'`,
    values: [title],
  };
};

export const createEventQuery = (event) => {
  return {
    name: "create-event",
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

export const updateEventQuery = (id, newData) => {
  return {
    name: "update-event",
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

export const deleteEventQuery = (id) => {
  return {
    name: "delete-event",
    text: "DELETE FROM events WHERE id = $1",
    values: [id],
  };
};
