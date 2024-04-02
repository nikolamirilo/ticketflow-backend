const { client } = require("../lib/database.config");
const { fetchSingleEventQuery } = require("../queries/events");

const getSingleEventMiddleware = async (req, res, next) => {
  const query = fetchSingleEventQuery(req.params.id);
  try {
    const result = await client.query(query);
    res.send(result.rows[0]);
    next();
  } catch (error) {
    console.error("Error fetching single event:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getSingleEventMiddleware };
