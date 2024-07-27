const swaggerAutogen = require("swagger-autogen");
const dotenv = require("dotenv");

dotenv.config();

const protocol = process.env.APP_URL === "localhost:5000" ? "http" : "https";
const host = process.env.APP_URL;

const doc = {
  info: {
    title: "Ticket Flow",
    description:
      "Backend for Ticket Flow Application. Below you can find all API endpoints which are served on this server.",
  },
  host: host,
  schemes: [protocol],
};

const outputFile = "./swagger_config.json";
const routes = [
  "./routes/event.routes.js",
  "./routes/user.routes.js",
  "./routes/offer.routes.js",
  "./routes/order.routes.js",
];

swaggerAutogen(outputFile, routes, doc);
