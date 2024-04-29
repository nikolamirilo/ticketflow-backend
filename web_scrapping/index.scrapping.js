import { fetchConcerts } from "./concerts.scrapping.js";
import { fetchParties } from "./parties.scrapping.js";
import { fetchTheaters } from "./theaters.scrapping.js";

export async function fetchEvents() {
  try {
    const concerts = await fetchConcerts();
    const theaters = await fetchTheaters();
    const parties = await fetchParties();
    const events = [...concerts, ...theaters];
    return events;
  } catch (err) {
    console.log(err);
  }
}
