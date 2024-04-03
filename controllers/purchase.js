export async function sendEmail(req, res) {
  try {
  } catch (err) {
    console.error("Error sending email:", error);
    res.status(500).send("Internal server error");
  }
}
