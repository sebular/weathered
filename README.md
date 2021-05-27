# Weathered

#### A simple weather app

## Features

* Uses OpenWeatherMap API data and caches results to help avoid exceeding your account's quotas
* Hourly weather for the next 24 hour period
* Daily weather for the upcoming week
* Automatic location detection and city lookup
* Searchable list of major global cities
* Save a list of favorites using local browser storage
* Responsive layouts for mobile and desktop

## Installation

1. Weathered uses SSL in order to access local storage. Use a service such as [Let's Encrypt](https://letsencrypt.org/) to get valid keys.
2. Create an account on [OpenWeatherMap](https://openweathermap.org/) in order to get an API key
3. Place SSL keys somewhere accessible (the `weathered/ssl` folder is added to `.gitignore` for convenience)
4. copy `.env.example` to `.env` and add the API key and SSL cert/key paths
5. run `npm install` and then `npm run dev`, then visit the URL shown in the console
6. run tests with `npm run test:watch`
