export const seedEventsTable = {
  name: "fill-events-table",
  text: `INSERT INTO events (title, description, images, category, artist, state, city, location, event_time, start_date, end_date, seat_number, seat_area) VALUES
('Rock am Ring', 'Rock am Ring is a three-day rock festival at the Nürburgring in Germany. See the full line-up for 2024, featuring Green Day, Korn, Slipknot and more, and get the latest news and many others.', ARRAY['https://th.bing.com/th/id/OIP.UTaNup2Q6EdduP3wwean6AHaEb?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.KCO8O9-rJwlLYskZJPWzzAHaE8?rs=1&pid=ImgDetMain'], 'concerts', 'Green Day', 'Germany', 'Nürburgring', '(50.3356, 6.9475)', '2024-06-01 15:00:00', '2024-06-01', '2024-06-03', 1000, 'Front'),
('Beer Fest', 'Beer Fest is festival in Serbia, Belgrade where Rock bands are singin and people are having fun', ARRAY['https://th.bing.com/th/id/OIP.I5Qc1Xr_jmnwU-tskn8vBgHaE8?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.c74967e0797bc084163d671fdbdefb25?rik=2%2b662aaz%2f9WJIQ&pid=ImgRaw&r=0'], 'festival', 'Rock Bands', 'Serbia', 'Belgrade', '(44.7866, 20.4489)', '2024-07-15 18:00:00', '2024-07-15', '2024-07-17', 1500, 'VIP'),
('Theater night', 'Night of free shows in theaters in Belgrade, Serbia', ARRAY['https://th.bing.com/th/id/R.fb13d2981bc08ecafece8ca0fc0b8eaa?rik=lGWQBtutenHr8Q&pid=ImgRaw&r=0'], 'theater', 'Various Artists', 'Serbia', 'Belgrade', '(44.7866, 20.4489)', '2024-08-20 20:00:00', '2024-08-20', '2024-08-20', 500, 'Back') ON CONFLICT DO NOTHING;`,
};
export const seedOffersTable = {
  name: "fill-offers-table",
  text: `INSERT INTO offers (event_id, details, price, seller_uid) VALUES
    (1, 'Front row tickets for the concert', 100, 1),
    (2, 'VIP backstage pass for the festival', 200, 2),
    (3, 'Exclusive dinner with the artist', 300, 3);
  `,
};

export const seedUsersTable = {
  name: "fill-users-table",
  text: `INSERT INTO users (full_name, phone, gender, isVerified, personal_id, sold_number, isReliableSeller, bio, email, image, role) VALUES
('John Doe', '+1234567890', 'Male', true, '1234567890', 10, true, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae libero nec odio vehicula semper eget sed nisi.', 'john.doe@gmail.com', 'https://g.foolcdn.com/editorial/images/454506/smiling-man-in-suit_gettyimages-509102308.jpg', 'admin'),
('Nikola Peric', '+987654321', 'Male', false, '0987654321', 5, false, 'Nulla nec metus scelerisque, gravida nulla id, suscipit odio. Nullam auctor malesuada efficitur.', 'nikola.peric@gmail.com', 'https://th.bing.com/th/id/OIP.7i2b664G--ip-h1Yk8K84AHaEo?rs=1&pid=ImgDetMain', 'customer'),
('Mika Mikic', '+1122334455', 'Female', true, '1122334455', 20, true, 'Pellentesque pretium ex quis orci interdum, sed suscipit arcu dictum. Vestibulum tempus efficitur ligula, nec convallis ligula posuere quis.', 'mika.mikic@gmail.com', 'https://th.bing.com/th/id/OIP.0oIkdrUxUHovwpTx2KFuyAAAAA?rs=1&pid=ImgDetMain', 'customer') ON CONFLICT DO NOTHING;`,
};
