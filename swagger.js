const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Tickt Flow",
    description:
      "Backend for Ticket Flow Application. Below you can find all API endpoints which are served.",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger_output.json";
const routes = ["./routes/events", "./routes/users"];

swaggerAutogen(outputFile, routes, doc);
