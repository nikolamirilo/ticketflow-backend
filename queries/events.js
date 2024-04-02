const createEventsTableQuery = {
  // give the query a unique name
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
  // give the query a unique name
  name: "fetch-events",
  text: `SELECT * FROM events`,
};

module.exports = { createEventsTableQuery, fetchEventsQuery };
