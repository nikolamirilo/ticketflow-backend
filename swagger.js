import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Tickt Flow",
    description:
      "Backend for Ticket Flow Application. Below you can find all API endpoints which are served.",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger_output.json";
const routes = [
  "./routes/events.routes.js",
  "./routes/users.routes.js",
  "./routes/offers.routes.js",
  "./routes/purchase.routes.js",
];

swaggerAutogen(outputFile, routes, doc);
