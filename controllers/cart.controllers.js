const { client } = require("../lib/database.config");
const { createCartItemsTable, fetchUserCartItems, fetchUserCartItemsQuery, addItemToCartQuery } = require("../queries/cart.queries");

async function getUserCartItems(req, res) {
    // #swagger.tags = ['Cart']
    const userId = req.params.id
    const query = fetchUserCartItemsQuery(userId)
    try {
    //   await client.query(createCartItemsTable);
      const cartResult = await client.query(query);
      let total = 0
      if (cartResult.rows.length > 0) {
        for (let item of cartResult.rows){
          total += item.offer.price
        }
        res.status(200).send({items: cartResult.rows, total});
      } else {
        const seededCartItemsResult = await client.query(query);
        res.send(seededCartItemsResult.rows);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
async function addNewCartItem(req, res) {
    // #swagger.tags = ['Cart']
      /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $userId: "user_29w83sxmXXNGwOuEthce5gg56Fee",
                $offerId: 3,
                $quantity: 2
            }
    } */
    const {userId, offerId, quantity} = req.body
    const query = addItemToCartQuery(userId, offerId, quantity)
    try {
      await client.query(query);
      res.status(200).send({message: "Succesully added item to the cart"});
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).send({ message: "Internal server error" });
    }
  }

  module.exports = {
    getUserCartItems,
    addNewCartItem
  }