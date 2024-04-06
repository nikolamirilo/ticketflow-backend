import { client } from "../lib/database.config.js";

export async function seedEventsTable(events) {
  try {
    for (const event of events) {
      // Execute the seed query to insert event into the database
      await client.query({
        name: "fill-events-table",
        text: `INSERT INTO events (title, image, location, link, date, category) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING;`,
        values: [
          event.title,
          event.image,
          event.location,
          event.link,
          event.date,
          event.category,
        ],
      });
    }
    console.log("Events inserted into database");
  } catch (err) {
    console.error("Error inserting events into database:", err);
  }
}
export const seedOffersTable = {
  name: "seed-offers-table",
  text: `INSERT INTO offers (event_id, details, seat_number, seat_area, price, seller_uid) VALUES
    (1, 'Front row tickets for the concert', 'A12', 'South', 100, 1),
    (2, 'VIP backstage pass for the festival', 'C2', 'North', 200, 2),
    (3, 'Exclusive dinner with the artist', 'B10', 'West', 300, 3);
  `,
};

export const seedUsersTable = {
  name: "seed-users-table",
  text: `INSERT INTO users (full_name, phone, gender, isVerified, personal_id, sold_number, isReliableSeller, bio, email, image, role) VALUES
('John Doe', '+1234567890', 'Male', true, '1234567890', 10, true, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero nec odio vehicula semper eget sed nisi.', 'john.doe@gmail.com', 'https://g.foolcdn.com/editorial/images/454506/smiling-man-in-suit_gettyimages-509102308.jpg', 'admin'),
('Nikola Peric', '+987654321', 'Male', false, '0987654321', 5, false, 'Nulla nec metus scelerisque, gravida nulla id, suscipit odio. Nullam auctor malesuada efficitur.', 'nikola.peric@gmail.com', 'https://th.bing.com/th/id/OIP.7i2b664G--ip-h1Yk8K84AHaEo?rs=1&pid=ImgDetMain', 'customer'),
('Mika Mikic', '+1122334455', 'Female', true, '1122334455', 20, true, 'Pellentesque pretium ex quis orci interdum, sed suscipit arcu dictum. Vestibulum tempus efficitur ligula, nec convallis ligula posuere quis.', 'mika.mikic@gmail.com', 'https://th.bing.com/th/id/OIP.0oIkdrUxUHovwpTx2KFuyAAAAA?rs=1&pid=ImgDetMain', 'customer') ON CONFLICT DO NOTHING;`,
};
