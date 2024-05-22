const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_config.json");
const allRoutes = require("./routes/index.routes.js");
const { client } = require("./lib/database.config.js");
const dotenv = require("dotenv");

dotenv.config();
//test 2

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
  // cron.schedule("0 4 * * *", async () => {
  //   try {
  //     await client.query(deleteEventsTableQuery);
  //     const events = await fetchEvents();
  //     await seedEventsTable(events);
  //     console.log("Seed Events cron job completed.");
  //   } catch (error) {
  //     console.error("Error running fetchEvents cron job:", error);
  //   }
  // });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
})();
