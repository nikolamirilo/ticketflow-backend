import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: "Tickt Flow",
    description:
      "Backend for Ticket Flow Application. Below you can find all API endpoints which are served on this server.",
  },
  host: process.env.APP_URL,
};

const outputFile = "./swagger_output.json";
const routes = [
  "./src/routes/event.routes.js",
  "./src/routes/user.routes.js",
  "./src/routes/offer.routes.js",
  "./src/routes/order.routes.js",
];

swaggerAutogen(outputFile, routes, doc);
