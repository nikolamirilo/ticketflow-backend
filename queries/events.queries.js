export const createEventsTableQuery = {
  name: "create-table-events",
  text: `CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    images TEXT[],
    category VARCHAR(100),
    artist VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    location VARCHAR(100),
    event_time TIMESTAMP,
    start_date DATE,
    end_date DATE,
    seat_number INTEGER,
    seat_area VARCHAR(50));`,
};
export const fetchEventsQuery = {
  name: "fetch-events",
  text: `SELECT * FROM events`,
};
export const fetchSingleEventQuery = (id) => {
  return {
    name: "fetch-single-event",
    text: `SELECT * FROM events WHERE id=$1`,
    values: [id],
  };
};
export const createEventQuery = (body) => {
  return {
    name: "create-event",
    text: `INSERT INTO events (title, description, images, category, artist, state, city, location, event_time, start_date, end_date, seat_number, seat_area) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
    values: [
      body.title,
      body.description,
      body.images,
      body.category,
      body.artist,
      body.state,
      body.city,
      body.location,
      body.event_time,
      body.start_date,
      body.end_date,
      body.seat_number,
      body.seat_area,
    ],
  };
};

export const updateEventQuery = (id, newData) => {
  return {
    name: "update-event",
    text: `UPDATE events SET title = $1, description = $2, images = $3, category = $4, artist = $5, state = $6, city = $7, location = $8, event_time = $9, start_date = $10, end_date = $11, seat_number = $12, seat_area = $13 WHERE id = $14`,
    values: [
      newData.title,
      newData.description,
      newData.images,
      newData.category,
      newData.artist,
      newData.state,
      newData.city,
      newData.location,
      newData.event_time,
      newData.start_date,
      newData.end_date,
      newData.seat_number,
      newData.seat_area,
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
