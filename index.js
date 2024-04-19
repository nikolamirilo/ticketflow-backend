import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger_config.json" assert { type: "json" };
import allRoutes from "./routes/index.routes.js";
import { client } from "./lib/database.config.js";
import dotenv from "dotenv";
import { fetchEvents } from "./web_scrapping/index.scrapping.js";
import { deleteEventsTableQuery } from "./queries/event.queries.js";
import cron from "node-cron";
import { seedEventsTable } from "./seed/index.seed.js";

dotenv.config();

const app = express();

(async () => {
  await client.connect();

  app.use(bodyParser.json());
  app.use(cors());

  // Setting headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

  app.use("/", allRoutes);

  app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  // Setting up cron jobs
  cron.schedule("0 4 * * *", async () => {
    try {
      await client.query(deleteEventsTableQuery);
      const events = await fetchEvents();
      await seedEventsTable(events);
      console.log("Seed Events cron job completed.");
    } catch (error) {
      console.error("Error running fetchEvents cron job:", error);
    }
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
})();
