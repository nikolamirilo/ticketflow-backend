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
        const imageUrl = el.find("div.img-box > img").attr("src");
        const image = imageUrl.replace("192x108", "640x360");
        const location = el.find("div.desc-box > div").text();
        const dateString = el.find("div.date-box > div").text();
        let date = ""
        let time = ""
        const timeRegex = /(\d{1,2}:\d{2})/; // Matches hh:mm pattern
        const match = dateString.match(timeRegex);
        if (match) {
            time = match[0]; // Extract the matched time
            const part1 = dateString.split(time)[0].trim()
            const part2 = dateString.split(time)[1].trim()
            date = part1 !== "" ? part1 : part2
        } else {
            date = dateString
        }
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
