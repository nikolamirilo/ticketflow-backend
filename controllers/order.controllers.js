import { sendEmail } from "../helpers/index.helpers.js";

export async function createOrder(req, res) {
  // #swagger.tags = ['Order']
  /*  #swagger.parameters['body'] = {
            in: 'body',
            schema: {
                $subject: 'Ticket order',
                $to: "ticket.flow.development@gmail.com",
                $full_name: 'Nikola Mirilo',
                $title: 'You purchased ticket successfully',
                $event_title: 'Ed Sheeran Concert',
                $seller_full_name: 'Pera Peric',
                $seller_email: 'peraperic@gmail.com',
                $total: 2500
            }
    } */
  const {
    subject,
    to,
    full_name,
    title,
    event_title,
    seller_full_name,
    seller_email,
    total,
  } = req.body;
  try {
    const result = await sendEmail(
      subject,
      to,
      full_name,
      title,
      event_title,
      seller_full_name,
      seller_email,
      total
    );
    res.send({ message: `Email sent successfully. Email id: ${result.id}` });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}
