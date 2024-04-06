import { client } from "../lib/database.config.js";
import {
  fetchOffersQuery,
  createOffersTableQuery,
  fetchSingleOfferQuery,
  createOfferQuery,
  updateOfferQuery,
  deleteOfferQuery,
} from "../queries/offers.queries.js";
import { seedOffersTable } from "../seed/index.seed.js";

export async function getAllOffers(req, res) {
  // #swagger.tags = ['Offers']
  try {
    await client.query(createOffersTableQuery);
    const offersResult = await client.query(fetchOffersQuery);
    if (offersResult.rows.length > 0) {
      res.send(offersResult.rows);
    } else {
      await client.query(seedOffersTable);
      const seededOffersResult = await client.query(fetchOffersQuery);
      res.send(seededOffersResult.rows);
    }
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

export async function getSingleOffer(req, res) {
  // #swagger.tags = ['Offers']
  const query = fetchSingleOfferQuery(req.params.id);
  try {
    const result = await client.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.error("Error fetching single offer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createOffer(req, res) {
  // #swagger.tags = ['Offers']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $event_id: 2,
                $price: 2000,
                $details: 'The most popular festival in Eastern Europe and world',
                $seller_uid: 2,
            }
    } */
  const query = createOfferQuery(req.body);
  try {
    await client.query(query);
    res.send({ message: "Successfully created offer" });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateOffer(req, res) {
  // #swagger.tags = ['Offers']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $event_id: 2,
                $price: 3000,
                $details: 'The most popular festival in Eastern Europe and world',
                $seller_uid: 2,
            }
    } */
  const query = updateOfferQuery(req.params.id, req.body);
  try {
    await client.query(query);
    await res.send({ message: "Successfully updated offer" });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteOffer(req, res) {
  // #swagger.tags = ['Offers']
  const query = deleteOfferQuery(req.params.id);
  try {
    await client.query(query);
    await res.send({ message: "Successfully deleted offer" });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
