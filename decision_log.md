# Part 3 – Decision Log

## Map and Weather
I used OpenStreetMap because it's free and easy to embed. The map only loads when the user clicks the button for privacy.

I used Open-Meteo because it provides live weather without an API key. I added error handling and a timeout.

## Performance
I used WebP images with a JPEG backup to reduce loading time. I also minified my CSS and JavaScript but kept the original files readable.

I used Google Fonts with Arial as a backup.

## Testing
I tested the map, weather, and images in Edge. My Lighthouse scores were 100 in all four categories.

## GitHub
I used a separate branch for Part 3 so I could review the changes before merging them into main.