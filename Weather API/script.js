fetch('/config')
.then(response => response.json())
.then(config => {
    const apiKey = config.API_KEY;
    getWeather(apiKey);
});

function getWeather(apiKey) {
    const city = document.getElementById("city").value.trim(); // Get input value

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            console.log("Weather data:", data);

            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            document.getElementById("weather").innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${weatherDescription}</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind speed: ${windSpeed} m/s</p>
            `;

            getUnsplashImages(getUnsplashImage(weatherDescription))
                .then(images => showSlideshow(images))
                .catch(error => console.error("Error fetching images:", error));

        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("weather").innerHTML = `<p style="color: red;">${city} not found. Please try again.</p>`;
        });
}

function getUnsplashImage(weatherDescription) {
    const weatherConditions = {
        "clear sky": "clear skies",
        "few clouds": "partly cloudy",
        "scattered clouds": "cloudy sky",
        "broken clouds": "cloudy sky",
        "shower rain": "rainy weather",
        "rain": "rainy weather",
        "thunderstorm": "thunderstorm",
        "snow": "snowy weather",
        "mist": "misty weather"
    };

    return weatherConditions[weatherDescription.toLowerCase()] || "nature";
    }

async function getUnsplashImages(query) {
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashApiKey}&count=5`;

    const response = await fetch(url);
    const images = await response.json();

    return images.map(images => images.urls.regular);
}

function showSlideshow(images) {
    const slideshowContainer = document.getElementById("slideshow");
    slideshowContainer.innerHTML = "";

    let currentIndex = 0;

    images.forEach((imageUrl, index) => {
        const imgElement =document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.classList.add("slideshow-image");
        imgElement.style.opacity = index === 0 ? "1" : "0";
        slideshowContainer.appendChild(imgElement);
    });

    const slides = document.querySelectorAll(".slideshow-image");
    slides[0].style.opacity="1"

    setInterval(() => {
        const slides = document.querySelectorAll(".slideshow-image");
        slides[currentIndex].style.opacity = "0";
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].style.opacity = "1";
    }, 5000);
}