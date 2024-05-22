const { fetchConcerts } = require("./concerts.scrapping.js");
const { fetchParties } = require("./parties.scrapping.js");
const { fetchTheaters } = require("./theaters.scrapping.js");

async function fetchEvents() {
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
module.exports = { fetchEvents };
