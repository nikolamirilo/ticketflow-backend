const seedEventsTable = {
  name: "fill-events-table",
  text: `INSERT INTO events (title, description, images, category) VALUES
('Rock am Ring', 'Rock am Ring is a three-day rock festival at the Nürburgring in Germany. See the full line-up for 2024, featuring Green Day, Korn, Slipknot and more, and get the latest news and many others.', ARRAY['https://th.bing.com/th/id/OIP.UTaNup2Q6EdduP3wwean6AHaEb?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.KCO8O9-rJwlLYskZJPWzzAHaE8?rs=1&pid=ImgDetMain'], 'concerts'),
('Beer Fest', 'Beer Fest is festival in Serbia, Belgrade where Rock bands are singin and people are having fun', ARRAY['https://th.bing.com/th/id/OIP.I5Qc1Xr_jmnwU-tskn8vBgHaE8?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/R.c74967e0797bc084163d671fdbdefb25?rik=2%2b662aaz%2f9WJIQ&pid=ImgRaw&r=0'], 'festival'),
('Theater night', 'Nigh of free shows in theaters in Belgrade, Serbia', ARRAY['https://th.bing.com/th/id/R.fb13d2981bc08ecafece8ca0fc0b8eaa?rik=lGWQBtutenHr8Q&pid=ImgRaw&r=0'], 'theater') ON CONFLICT DO NOTHING;`,
};
module.exports = { seedEventsTable };
