
const form = document.getElementById("enquiryForm");
const output = document.getElementById("formErrors");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
let timer;

function validate() {
    const badName = !nameInput.value.trim();
    const badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const badMessage = !messageInput.value.trim() || messageInput.value.length > 500;

    nameInput.setAttribute("aria-invalid", badName);
    emailInput.setAttribute("aria-invalid", badEmail);
    messageInput.setAttribute("aria-invalid", badMessage);

    const errors = [];
    if (badName) errors.push("Enter your name.");
    if (badEmail) errors.push("Enter a valid email.");
    if (badMessage) errors.push("Enter a message (1-500 characters).");

    output.textContent = errors.join(" ") || "Everything looks good.";
    return errors.length === 0;
}

form.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(validate, 300);
});

function escapeText(text) {
    return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
               .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
               .replaceAll("'", "&#39;");
}

form.addEventListener("submit", event => {
    event.preventDefault();
    clearTimeout(timer);
    if (!validate()) return;

    const data = Object.fromEntries(new FormData(form));
    for (const key in data) data[key] = escapeText(data[key]);
    console.log(data);
    output.textContent = "Valid! Data shown in console.";

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let start;
    output.style.opacity = 0;

    function fade(time) {
        if (start === undefined) start = time;
        const progress = Math.min((time - start) / 300, 1);
        output.style.opacity = progress;
        if (progress < 1) requestAnimationFrame(fade);
    }
    requestAnimationFrame(fade);
});
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