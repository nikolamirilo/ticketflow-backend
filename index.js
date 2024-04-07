import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_output.json" assert { type: "json" };
import allRoutes from "./routes/index.routes.js";
import { client } from "./lib/database.config.js";
import dotenv from "dotenv";
import { fetchEvents } from "./web_scrapping/index.scrapping.js";
import { deleteEventsTableQuery } from "./queries/events.queries.js";
import cron from "node-cron";
import { seedEventsTable } from "./seed/index.seed.js";

dotenv.config();

const app = express();

(async () => {
  await client.connect();
  // Create tables

  app.use(bodyParser.json());
  app.use(cors());

  app.use("/", allRoutes);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.APP_URL);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  cron.schedule("0 4 * * *", async () => {
    try {
      // Cron job which will get fresh data for events. It will run every day at 4am.
      await client.query(deleteEventsTableQuery);
      const events = await fetchEvents();
      await seedEventsTable(events);
      console.log("Seed Events cron job completed.");
    } catch (error) {
      console.error("Error running fetchEvents cron job:", error);
    }
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
