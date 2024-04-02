const createEventsTableQuery = {
  name: "create-table-events",
  text: `CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    images TEXT[],
    category VARCHAR(100)
);`,
};
const fetchEventsQuery = {
  name: "fetch-events",
  text: `SELECT * FROM events`,
};
const fetchSingleEventQuery = (id) => {
  return {
    name: "fetch-single-event",
    text: `SELECT * FROM events WHERE id=$1`,
    values: [id],
  };
};
const createEventQuery = (body) => {
  return {
    name: "create-event",
    text: `INSERT INTO events (title, description, images, category) VALUES
    ($1, $2, $3, $4)`, // Using parameterized query to prevent SQL injection
    values: [body.title, body.description, body.images, body.category], // Passing values separately to prevent SQL injection
  };
};
const updateEventQuery = (eventId, newData) => {
  return {
    name: "update-event",
    text: `UPDATE events SET title = $1, description = $2, images = $3, category = $4 WHERE id = $5`,
    values: [
      newData.title,
      newData.description,
      newData.images,
      newData.category,
      eventId,
    ],
  };
};

const deleteEventQuery = (eventId) => {
  return {
    name: "delete-event",
    text: "DELETE FROM events WHERE id = $1",
    values: [eventId],
  };
};

module.exports = {
  createEventsTableQuery,
  fetchEventsQuery,
  fetchSingleEventQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
};
