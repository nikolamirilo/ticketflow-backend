const axios = require("axios");
const cheerio = require("cheerio");

// Function to fetch events
async function fetchTheaters() {
  try {
    const events = new Set(); // Use a Set to store unique events

    for (let i = 0; i < 20; i++) {
      const { data } = await axios.get(
        `https://tickets.rs/category/pozorista?CurrentPage=${i}#fpoint`
      );
      if (data == null) {
        break;
      }
      const $ = cheerio.load(data);

      $("div.event-list-items > div > a").each(async (index, element) => {
        const el = $(element);
        const title = el.find("div.desc-box > h5").text();
        // Skip theater if title contains "VIP"
        if (
          title.toLowerCase().includes("vip") ||
          title.toLowerCase().includes("godišnja ulaznica")
        ) {
          return; // Skip current iteration of the loop
        }
        const link = `https://tickets.rs${el.attr("href")}`;
        const image = el.find("div.img-box > img").attr("src");
        const location = el.find("div.desc-box > div").text();
        const dateString = el.find("div.date-box > div").text();
        const date = dateString.slice(0, -6);
        const time = dateString.slice(-6);
        const event = {
          title: title.trim(),
          image,
          location,
          link,
          date: date.trim(),
          time: time.trim(),
          category: "theater",
        };
        events.add(JSON.stringify(event)); // Convert event to JSON string and add to Set
      });
    }

    // Convert Set back to array of unique events
    const uniqueTheaters = Array.from(events).map((event) => JSON.parse(event));

    return uniqueTheaters;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { fetchTheaters };
