const { client } = require("../lib/database.config");
const {
  fetchEventsQuery,
  createEventsTableQuery,
  seedEventsTable,
  fetchSingleEventQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
} = require("../queries/events");

async function getAllEvents(req, res) {
  // #swagger.tags = ['Events']
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
  // #swagger.tags = ['Events']
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
  // #swagger.tags = ['Events']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $title: 'Exit festival',
                $category: 'festival',
                $description: 'The most popular festival in Eeastern Europe',
                $images: ['https://th.bing.com/th/id/R.60806716e8df10005535a459c82f37fe?rik=R2sNermhBkDNYA&pid=ImgRaw&r=0']

            }
    } */
  const query = createEventQuery(req.body);
  try {
    await client.query(query);
    res.send({ message: "Successfully created event" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateEvent = async (req, res) => {
  // #swagger.tags = ['Events']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $title: 'Exit festival 2024',
                $category: 'festival',
                $description: 'The most popular festival in Eeastern Europe and world',
                $images: ['https://th.bing.com/th/id/R.60806716e8df10005535a459c82f37fe?rik=R2sNermhBkDNYA&pid=ImgRaw&r=0']

            }
    } */
  const query = updateEventQuery(req.params.id, req.body);
  try {
    await client.query(query);
    await res.send({ message: "Successfully updated event" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteEvent = async (req, res) => {
  // #swagger.tags = ['Events']
  const query = deleteEventQuery(req.params.id);
  try {
    await client.query(query);
    await res.send({ message: "Successfully deleted event" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
