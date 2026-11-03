
const weather = document.getElementById("weather");

async function loadWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=51.05&longitude=-114.07&current=temperature_2m,wind_speed_10m";

    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(7000)
        });

        if (!response.ok) throw new Error("Weather unavailable");

        const data = await response.json();
        const temp = data.current.temperature_2m;
        const wind = data.current.wind_speed_10m;

        if (!Number.isFinite(temp) || !Number.isFinite(wind)) {
            throw new Error("Invalid weather data");
        }

        weather.textContent = `Temperature: ${temp}°C | Wind: ${wind} km/h`;
    } catch {
        weather.textContent = "Weather unavailable. Please try again later.";
    }
}

loadWeather();

const mapButton = document.getElementById("loadMap");
const map = document.getElementById("trailMap");

mapButton.addEventListener("click", () => {
    map.src = map.dataset.src;
    map.hidden = false;
    mapButton.remove();
});
