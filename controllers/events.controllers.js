import { client } from "../lib/database.config.js";
import {
  fetchEventsQuery,
  createEventsTableQuery,
  fetchSingleEventQuery,
  createEventQuery,
  updateEventQuery,
  deleteEventQuery,
  searchEventsQuery,
} from "../queries/events.queries.js";
import { seedEventsTable } from "../seed/index.seed.js";
import { fetchEvents } from "../web_scrapping/index.scrapping.js";

export async function getAllEvents(req, res) {
  // #swagger.tags = ['Events']
  await client.query(createEventsTableQuery);
  try {
    const eventsResult = await client.query(fetchEventsQuery);
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

export async function getSingleEvent(req, res) {
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
export async function searchEvents(req, res) {
  // #swagger.tags = ['Events']
  const query = searchEventsQuery(req.params.title);
  try {
    const result = await client.query(query);
    res.send(result.rows);
  } catch (error) {
    console.error("Error searching for events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createEvent(req, res) {
  // #swagger.tags = ['Events']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $title: 'Exit festival',
                $category: 'festival',
                $description: 'The most popular festival in Eastern Europe',
                $images: ['https://th.bing.com/th/id/R.60806716e8df10005535a459c82f37fe?rik=R2sNermhBkDNYA&pid=ImgRaw&r=0'],
                $artist: 'Various Artists',
                $state: 'Serbia',
                $city: 'Novi Sad',
                $location: '(45.2671, 19.8335)',
                $event_time: '2024-07-06 20:00:00',
                $start_date: '2024-07-06',
                $end_date: '2024-07-10',
                $seat_number: 2000,
                $seat_area: 'General Admission'
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

export async function updateEvent(req, res) {
  // #swagger.tags = ['Events']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $title: 'Exit festival 2024',
                $category: 'festival',
                $description: 'The most popular festival in Eastern Europe and world',
                $images: ['https://th.bing.com/th/id/R.60806716e8df10005535a459c82f37fe?rik=R2sNermhBkDNYA&pid=ImgRaw&r=0'],
                $artist: 'Various Artists',
                $state: 'Serbia',
                $city: 'Novi Sad',
                $location: '(45.2671, 19.8335)',
                $event_time: '2024-07-06 20:00:00',
                $start_date: '2024-07-06',
                $end_date: '2024-07-10',
                $seat_number: 2000,
                $seat_area: 'General Admission'
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

export async function deleteEvent(req, res) {
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
