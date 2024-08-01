const { Resend } = require("resend");

const resend = new Resend("re_3AtN49Zx_P9CXsQdaR1HEZUybagb856SG");

async function sendEmail(body) {
  const generateOrderRows = (orders) => {
    return orders.map((item) => {
        return `
            <tr style="width:100%">
                <td style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                    <a href='${item.event_link}'>${item.event_title}</a>
                </td>
                <td style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                    ${item.seller_full_name}, ${item.seller_email}
                </td>
                <td style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                    ${item.quantity}
                </td>
                <td style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                    ${item.total},00 RSD
                </td>
            </tr>
        `;
    }).join('');
};
  try {
    const { data, error } = await resend.emails.send({
      from: "'Ticket Flow'<admin@ticketflow.rs>",
      to: body.to,
      subject: "Uspešna kupovina na sajtu ticketflow.rs",
      html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
</head>
<body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:45em">
        <tbody>
            <tr style="width:100%">
                <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                        style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                                        role="presentation">
                                        <tbody style="width:100%">
                                            <tr style="width:100%">
                                                <img src="https://res.cloudinary.com/ticketflow-upload/image/upload/fl_preserve_transparency/v1716138792/Ticket%20Flow%20Static/email_bg_hg3dyy.jpg?_s=public-apps"
                                                    style="display:block;outline:none;border:none;text-decoration:none;max-width:100%" width="620" />
                                            </tr>
                                        </tbody>
                                    </table>
                                    <h1 style="font-size:24px;font-weight:bold;text-align:center">Zdravo ${body.full_name},</h1>
                                    <h2 style="font-size:20px;font-weight:bold;text-align:center">Uspešno ste kupili kartu!</h2>
                                    <table align="center" width="100%" border="1" cellPadding="5" cellSpacing="0" role="presentation"
                                        style="padding:20px;padding-bottom:0; border-collapse: collapse;">
                                        <thead style="width:100%;background-color:#f9f9f9;">
                                            <tr style="width:100%">
                                                <th style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                                                    <b>Dogadjaj</b>
                                                </th>
                                                <th style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                                                    <b>Prodavac</b>
                                                </th>
                                                <th style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                                                    <b>Količina</b>
                                                </th>
                                                <th style="font-size:16px;line-height:24px;text-align:left;border:1px solid #ddd;padding:8px;">
                                                    <b>Iznos</b>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody style="width:100%">
                                            ${generateOrderRows(body.orders)}
                                        </tbody>
                                    </table>
                                    <!-- <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0"
                                        role="presentation" style="padding:20px;padding-top:0">
                                        <tbody style="width:100%">
                                            <tr style="width:100%">
                                                <td colSpan="2" body-id="__react-email-column"
                                                    style="display:flex;justify-content:center;width:100%">
                                                    <a href=${body.event_link} style="background-color:#2dc6de;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;padding:12px 30px 12px 30px;line-height:100%;text-decoration:none;display:inline-block;max-width:100%" target="_blank">
                                                        <span></span>
                                                        <span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Informacije o dogadjaju</span>
                                                        <span></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation"
                        style="padding:45px 0 0 0">
                        <tbody>
                            <tr>
                                <td><img src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/yelp-footer.png"
                                        style="display:block;outline:none;border:none;text-decoration:none;max-width:100%" width="620" /></td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">©
                        2024 | TicketFlow, Belgrade, 11000, Serbia | <a href="http://www.ticketflow.rs">www.ticketflow.rs</a>
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
`,
    });
    if (error) {
      return console.error(error);
    }
    return data;
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send({ message: "Internal server error" });
  }
}

function formatDate(dateString) {
  // Split the date string into parts
  const parts = dateString.split(" ");

  // Ensure that the parts array has at least three elements
  if (parts.length >= 3) {
    // Remove the dot at the end of the year (if it exists)
    const year = parts[2].endsWith(".") ? parts[2].slice(0, -1) : parts[2];

    // Transform the month name into its numerical representation
    const monthNames = [
      "januar",
      "februar",
      "mart",
      "april",
      "maj",
      "jun",
      "jul",
      "avgust",
      "septembar",
      "oktobar",
      "novembar",
      "decembar",
    ];
    const monthIndex = monthNames.indexOf(parts[1].toLowerCase());
    const month =
      monthIndex !== -1 ? (monthIndex + 1).toString().padStart(2, "0") : "01";

    // Return the formatted date string
    return `${body.parts[0]}.${body.month}.${body.year}.`;
  } else {
    // If the parts array doesn't have enough elements, return the original string
    return dateString;
  }
}

module.exports = { sendEmail, formatDate };
