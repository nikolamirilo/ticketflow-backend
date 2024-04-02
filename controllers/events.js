const { client } = require("../lib/database.config");
const {
  fetchEventsQuery,
  createEventsTableQuery,
  seedEventsTable,
} = require("../queries/events");

async function getAllEvents(req, res) {
  try {
    await client.query(createEventsTableQuery);
    const eventsResult = await client.query(fetchEventsQuery);
    if (eventsResult.rows.length > 0) {
      res.send(eventsResult.rows);
    } else {
      await client.query(seedEventsTable);
      const seededEventsResult = await client.query(fetchEventsQuery);
      res.send(seededEventsResult.rows);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { getAllEvents };
