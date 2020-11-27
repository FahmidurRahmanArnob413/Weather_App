<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <link rel="stylesheet" href="main.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Lobster', cursive;
            background-image: url('pic.jpg');
            background-size: cover;
            background-position: top center;
        }

        .app-wrap {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6));
        }

        header {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px 15px 15px;
        }

        header input {
            width: 100%;
            max-width: 280px;
            padding: 10px 15px;
            border: none;
            outline: none;
            background-color: rgba(11, 42, 61, 0.6);
            border-radius: 18px 2px 18px 2px;
            border-bottom: 3px solid #ffffff;
            color: #FFF;
            font-size: 17px;
            font-weight: 300;
            transition: 0.2s ease-out;
        }

        header input:focus {
            background-color: rgba(27, 52, 80, 0.8);
        }

        main {
            flex: 1 1 100%;
            padding: 25px 25px 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .location .city {
            color: #FFF;
            font-size: 22px;
            font-weight: 500;
            margin-bottom: 5px;
        }

        .location .date {
            color: #FFF;
            font-size: 16px;
        }

        .current .temp {
            color: #FFF;
            font-size: 55px;
            font-weight: 900;
            margin: 30px 0px;
            text-shadow: 4px 10px rgba(0, 0, 0, 0.80);
        }

        .current .temp span {
            font-weight: 500;
        }

        .current .weather {
            color: #FFF;
            font-size: 32px;
            font-weight: 700;
            font-style: italic;
            margin-bottom: 15px;
            text-shadow: 4px 4px rgba(0, 0, 0, 0.70);
        }

        .current .hi-low {
            color: #FFF;
            font-size: 22px;
            font-weight: 500;
            text-shadow: 2px 6px rgba(0, 0, 0, 0.80);
        }
    </style>
</head>

<body>
    <div class="app-wrap">
        <header>
            <input type="text" autocomplete="off" class="search-box" placeholder="Search for a city...">
        </header>
        <main>
            <section class="location">
                <div class="city">New York,US</div>
                <div class="date">Friday 27 November 2020</div>
            </section>
            <div class="current">
                <div class="temp">11<span>C</span></div>
                <div class="weather">Sunny</div>
                <div class="hi-low">13c / 16c</div>
            </div>
        </main>
    </div>
    <script>
        console.log(`Weather App`);

        const api = {
            key: "b584e8fc49e7b1ba66f2d176ca58abeb",
            base: "https://api.openweathermap.org/data/2.5/"
        }

        const searchBox = document.querySelector('.search-box');
        searchBox.addEventListener('keypress', setQuery);

        function setQuery(evt) {
            if (evt.keyCode == 13) {//13 holo enter key 
                getResults(searchBox.value);
            }
        }

        function getResults(query) {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(weather => {
                    return weather.json();
                }).then(displayResults);

        }

        function displayResults(weather) {
            let city = document.querySelector('.location .city');
            city.innerText = `${weather.name}, ${weather.sys.country}`;

            let now = new Date();
            let date = document.querySelector('.location .date');
            date.innerText = dateBuilder(now);

            let temp = document.querySelector('.current .temp');
            temp.innerHTML = `${Math.round(weather.main.temp)}<span>c</span>`;

            let weather_el = document.querySelector('.current .weather');
            weather_el.innerText = weather.weather[0].main;

            let hilow = document.querySelector('.hi-low');
            hilow.innerText = `${Math.round(weather.main.temp_min)}c / ${Math.round(weather.main.temp_max)}c`;
        }

        function dateBuilder(d) {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();

            return `${day} ${date} ${month} ${year}`;
        }
    </script>
</body>

</html>
