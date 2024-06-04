const { fetchConcerts } = require("./concerts.scrapping.js");
const { fetchFestivals } = require("./festivals.scrapping.js");
const { fetchParties } = require("./parties.scrapping.js");
const { fetchTheaters } = require("./theaters.scrapping.js");

async function fetchEvents() {
  try {
    const concerts = await fetchConcerts();
    const theaters = await fetchTheaters();
    const festivals = await fetchFestivals()
    const parties = await fetchParties();
    const events = [...concerts, ...theaters, ...festivals];
    return events;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { fetchEvents };
