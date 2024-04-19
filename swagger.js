import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: "Ticket Flow",
    description:
      "Backend for Ticket Flow Application. Below you can find all API endpoints which are served on this server.",
  },
  host: process.env.APP_URL,
};

const outputFile = "./swagger_config.json";
const routes = [
  "./routes/event.routes.js",
  "./routes/user.routes.js",
  "./routes/offer.routes.js",
  "./routes/order.routes.js",
];

swaggerAutogen(outputFile, routes, doc);
