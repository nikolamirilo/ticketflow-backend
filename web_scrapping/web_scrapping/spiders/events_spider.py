import scrapy

class EventsSpider(scrapy.Spider):
    name = "events"
    
    def start_requests(self):
        # Iterate over the range and yield requests for each URL
        for i in range(0, 20):
            url = f"https://tickets.rs/category/koncerti_muzika?CurrentPage={i}#fpoint"
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for event in response.css('div.event-list-items > div > a'):
            yield {
                "title": event.css('div.desc-box > h5::text').get(),
                "image": event.css('div.img-box > img::attr(src)').get(),
                "location": event.css('div.desc-box > div::text').get(),
                "date": event.css('div.date-box > div::text').get(),
            }
        
        next_page = response.css('a.next::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)
