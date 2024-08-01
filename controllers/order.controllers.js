const { sendEmail } = require("../helpers/index.helpers.js");

async function createOrder(req, res) {
// #swagger.tags = ['Order']
/*  #swagger.parameters['body'] = {
        in: 'body',
        schema: {
            $to: "ticket.flow.development@gmail.com",
            $full_name: 'Nikola Mirilo',
            $orders: [
                {
                    $event_title: 'Ed Sheeran Concert',
                    $seller_full_name: 'Mika Mikic',
                    $seller_email: 'mikamikic@gmail.com',
                    $event_link: 'https://ticketflow.rs/events/1',
                    $total: 2500,
                    $quantity: 2
                },
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
    const result = await sendEmail(req.body);
    res.send({ message: `Email sent successfully. Email id: ${result.id}` });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}
module.exports = { createOrder };
