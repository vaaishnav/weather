import React, { useState } from 'react';

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const getRandomCountry = async () => {
        try {
            const state = document.getElementById("locationInput").value;

            const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);

            const allWeather = await weather.json();
            console.log(allWeather);
            setWeatherData(allWeather);
        } catch (err) {
            setError(err);
            console.log(err);
        }
    }

    const renderWeatherInfo = () => {
        if (weatherData) {
            const { main, name, sys, wind, main: { humidity, pressure }, timezone } = weatherData;

            // Your provided timezone offset in seconds (19800 seconds is GMT +05:30)
            const timezoneOffsetInSeconds = timezone;

            // Get the current UTC time in milliseconds
            const currentUTCTime = Date.now();

            // Calculate the local time by adding the timezone offset
            const localTime = new Date(currentUTCTime + timezoneOffsetInSeconds * 1000);

            // Format the date according to the desired format
            const options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            };
            const formattedTime = localTime.toLocaleString('en-US', options);

            return (
                <>
                    <div className="d-flex flex-column text-center mt-5 mb-4">
                        <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}><strong>{main.temp}°C</strong></h6>
                        <span className="small" style={{ color: '#868B94' }}>{name}</span>
                    </div>

                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                            <div><i className="fas fa-wind fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1">Country:-<strong> {sys.country}</strong></span></div>
                            <div><i className="fas fa-tint fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1">Feels like:- <strong>{main.feels_like}°C </strong></span></div>
                            <div><i className="fas fa-sun fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1">Humidity:- <strong>{humidity}% </strong></span></div>
                            <div><i className="fas fa-sun fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1">Wind:-<strong> {wind.speed}</strong></span></div>
                            <div><i className="fas fa-sun fa-fw" style={{ color: '#868B94' }}></i> <span className="ms-1">Pressure:-<strong> {pressure}</strong></span></div>

                        </div>

                        <div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" width="100px" alt="Weather Icon" />
                        </div>

                    </div>
                    <div className="m-3"><i className="far fa-clock fa-fw " style={{ color: '#868B94' }}></i> <span className="ms-1"><strong>{formattedTime}</strong></span></div>
                </>
            );
        } else if (error) {
            return <div>Error fetching weather data. Please try again later.</div>;
        } else {
            return null;
        }
    };

    return (
        <div className='text-center mt-4 p-2'>
            <input className='rounded p-1 m-1' id="locationInput" type="text" placeholder="Enter location" />
            <button className='btn btn-primary m-4' onClick={getRandomCountry}>Get Weather</button>
            <div id="result">{renderWeatherInfo()}</div>
        </div>
    );
}

export default WeatherComponent;
