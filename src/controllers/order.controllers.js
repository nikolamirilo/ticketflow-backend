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
                $description: 'Thank you for using our platform, we hope your experience was awesome!'
            }
    } */
  const { subject, to, title, description, full_name } = req.body;
  try {
    const result = await sendEmail(subject, to, title, description, full_name);
    res.send({ message: `Email sent successfully. Email id: ${result.id}` });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}
