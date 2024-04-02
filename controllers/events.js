const { client } = require("../lib/database.config");
const {
  fetchEventsQuery,
  createEventsTableQuery,
  seedEventsTable,
  fetchSingleEventQuery,
  createEventQuery,
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

const getSingleEvent = async (req, res) => {
  const query = fetchSingleEventQuery(req.params.id);
  try {
    const result = await client.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching single event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createEvent = async (req, res) => {
  const query = createEventQuery(req.body); // Corrected function call
  try {
    await client.query(query);
    res.send({ message: "Successfully created event" }); // Sending a success message
  } catch (error) {
    console.error("Error creating event:", error); // Corrected console message
    res.status(500).json({ message: "Internal server error" });
  }
};

// const updateEvent = async (req, res) => {
//   if (req.body.email !== null) {
//     res.user.email = req.body.email;
//   }
//   try {
//     const updatedEvent = await res.user.save();
//     res.json(updatedEvent);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteEvent = async (req, res) => {
//   try {
//     await res.user.remove();
//     res.json({ message: "Deleted Adacta's Event" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = { getAllEvents, getSingleEvent, createEvent };
