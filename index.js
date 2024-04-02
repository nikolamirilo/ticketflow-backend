require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createEventsTableQuery } = require("./queries/events");
const { seedEventsTable } = require("./seed");
const eventRoutes = require("./routes/events");
const { client } = require("./lib/database.config");

const app = express();

(async () => {
  await client.connect();
  // Create tables

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/events", eventRoutes);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // For PRODUCTION
  // app.use((req, res, next) => {
  //   res.header(
  //     "Access-Control-Allow-Origin",
  //     "https://citrix-availability.up.railway.app"
  //   );
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   next();
  // });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
  // // End client
  // await client.end();
})();
