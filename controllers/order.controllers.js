const { sendEmail } = require("../helpers/index.helpers.js");

async function createOrder(req, res) {
// #swagger.tags = ['Order']
/*  #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            $to: "ticket.flow.development@gmail.com",
            $full_name: 'Nikola Mirilo',
            $total: 5000,
            $orders: [
                {
                    $event_title: 'AC/DC',
                    $seller_full_name: 'Pera Peric',
                    $seller_email: 'peraperic@gmail.com',
                    $event_link: 'https://ticketflow.rs/events/2',
                    $total: 3500,
                    $quantity: 1
                }
            ]
        }
    } */
  try {
    const {orders, to, full_name, total} = req.body
    const result = await sendEmail({orders, to, full_name, total});
    res.send({ message: `Order created successfully. Email id: ${result.id}` });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}
module.exports = { createOrder };
