import { fetchConcerts } from "./concerts.scrapping.js";
import { fetchTheaters } from "./theaters.scrapping.js";

export async function fetchEvents() {
  try {
    const concerts = await fetchConcerts();
    const theaters = await fetchTheaters();
    const events = [...concerts, ...theaters];
    return events;
  } catch (err) {
    console.log(err);
  }
}
