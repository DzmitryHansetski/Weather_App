import React, {useState} from 'react';
import './App.css';
import {Weather} from "./Weather.tsx";


function App() {
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<{ temp: number, description: string } | null>(null);


    const fetchWeather = () => {
        const apiKey = '8c8567f1f065f8ee70881bd3639e97f2';

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found');
                    setWeather(null);
                } else {
                    setWeather({
                        temp: json.main.temp,
                        description: json.weather[0].description
                    });
                    setError(null);
                }
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setError('An error occurred');
                setWeather(null);
            });
    }


    return (
        <div className="App">
            <h1>Weather App</h1>
            <div>
                <input type="text" value={city} onChange={(e) => setCity(e.currentTarget.value)}/>
                <button onClick={fetchWeather}>Get weather</button>
            </div>

            {error &&<div style={{ color: 'red' }}>{error}</div>}
            {weather && <Weather temp={weather.temp} description={weather.description}/>}
        </div>
    );
}

export default App;