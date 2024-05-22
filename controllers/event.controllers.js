const { client } = require("../lib/database.config.js");
const { getRedisClient } = require("../lib/redis.config.js");
const {
  fetchEventsQuery,
  createEventsTableQuery,
  fetchSingleEventQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
  fetchCategoryEventsQuery,
  deleteEventsTableQuery,
  fetchFilterEventsQuery,
} = require("../queries/event.queries.js");
const { seedEventsTable } = require("../seed/index.seed.js");
const { fetchEvents } = require("../web_scrapping/index.scrapping.js");



async function getAllEvents(req, res) {
  // #swagger.tags = ['Events']
  await client.query(createEventsTableQuery);
  try {
    const eventsResult = await client.query(fetchEventsQuery);
    const redisClient = getRedisClient();
    await redisClient.set("events", JSON.stringify({events:[{
      id: 1,
      title: "MERAB AMZOEVI",
      image: "https://assets.tickets.rs/123abc321/0/Images/ea56654e-2569-4278-bd5c-05d7084e17d4___192x108.jpeg",
      location: "Zappa Baza",
      link: "https://tickets.rs/event/merab_amzoevi_12696",
      date: "20. maj 2024",
      time: "20:00",
      category: "concert"
  },
  {
      id: 2,
      title: "Sestre Gobović - Lepota je u tradiciji",
      image: "https://assets.tickets.rs/123abc321/0/Images/95984244-e844-4c53-af17-bf5798aec26e___192x108.jpeg",
      location: "mts dvorana",
      link: "https://tickets.rs/event/sestre_gobovic_lepota_je_u_tradiciji_12612",
      date: "20. maj 2024",
      time: "20:00",
      category: "concert"
  }]}))
    if (eventsResult.rows.length > 0) {
      res.send(eventsResult.rows);
    } else {
      const events = await fetchEvents();
      await seedEventsTable(events);
      const seededEventsResult = await client.query(fetchEventsQuery);
      res.send(seededEventsResult.rows);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
async function getCategoryEvents(req, res) {
  // #swagger.tags = ['Events']
  const query = fetchCategoryEventsQuery(req.params.category);
  try {
    const eventsResult = await client.query(query);
    res.send(eventsResult.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
async function getFilterEvents(req, res) {
  // #swagger.tags = ['Events']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $title: 'par',
                $category: 'concert',
                $location: 'banovina',
                $date: '2024',
            }
    } */
  const query = fetchFilterEventsQuery(req.body);
  try {
    const eventsResult = await client.query(query);
    res.send(eventsResult.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

async function getSingleEvent(req, res) {
  // #swagger.tags = ['Events']
  const query = fetchSingleEventQuery(req.params.id);
  try {
    const result = await client.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching single event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createEvent(req, res) {
  // #swagger.tags = ['Events']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
            $title: "Anime simfonija",
            $image: "https://assets.tickets.rs/123abc321/0/Images/a89db5f9-19dc-4a82-a684-3df4d51e2e8d___192x108.jpeg",
            $location: "mts dvorana",
            $link: "https://tickets.rs/event/anime_simfonija_9967",
            $date: "26. april 2024.",
            $time: "20:00",
            $category: "concert"
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
}

async function updateEvent(req, res) {
  // #swagger.tags = ['Events']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
            $title: "Anime simfonija",
            $image: "https://assets.tickets.rs/123abc321/0/Images/a89db5f9-19dc-4a82-a684-3df4d51e2e8d___192x108.jpeg",
            $location: "mts dvorana",
            $link: "https://tickets.rs/event/anime_simfonija_9967",
            $date: "26. april 2024.",
            $time: "20:00",
            $category: "concert"
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
}

async function deleteEvent(req, res) {
  // #swagger.tags = ['Events']
  const query = deleteEventQuery(req.params.id);
  try {
    await client.query(query);
    await res.send({ message: "Successfully deleted event" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function refreshEventData(req, res) {
  // #swagger.tags = ['Events']
  try {
    await client.query(deleteEventsTableQuery);
    const events = await fetchEvents();
    await seedEventsTable(events);
    res.send({ message: "Seed Events cron job completed." });
  } catch (error) {
    res.send({ error });
  }
}
module.exports = {
  getAllEvents,
  getCategoryEvents,
  getFilterEvents,
  getSingleEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  refreshEventData,
};
