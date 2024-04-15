// WeatherApp.jsx
import { useState, useEffect } from 'react';
import weather from '../../Weather-Update/src/assets/weather.png';

const WeatherApp = () => {
    // State variables
    const [selectedLocation, setSelectedLocation] = useState(localStorage.getItem('selectedLocation') || 'Berlin');
    const [weatherData, setWeatherData] = useState(null);

    // API endpoints for different locations
    const apiEndpoints = {
        Berlin: 'http://api.weatherapi.com/v1/current.json?key=d0b7abc2b79441ef8e993054241303&q=Berlin&aqi=no',
        Munich: 'http://api.weatherapi.com/v1/current.json?key=d0b7abc2b79441ef8e993054241303&q=Munich&aqi=no',
        Hamburg: 'http://api.weatherapi.com/v1/current.json?key=d0b7abc2b79441ef8e993054241303&q=Hamburg&aqi=no'
    };

    // Fetch weather data from API
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(apiEndpoints[selectedLocation]);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    // Update weather data every 30 seconds
    useEffect(() => {
        fetchWeatherData();
        const intervalId = setInterval(fetchWeatherData, 30000);
        return () => clearInterval(intervalId);
    }, [selectedLocation]);

    // Handle location selection
    const handleLocationChange = (e) => {
        const newLocation = e.target.value;
        setSelectedLocation(newLocation);
        localStorage.setItem('selectedLocation', newLocation);
    };

    return (
        <div className="relative bg-gray-200 min-h-screen">
            <img src={weather} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-200 bg-opacity-50">
                <header className="py-8 max-w-md mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Weather App</h1>
                    <select
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        className="p-2 rounded-md bg-white shadow-md w-full max-w-xs"
                    >
                        <option value="Berlin">Berlin</option>
                        <option value="Munich">Munich</option>
                        <option value="Hamburg">Hamburg</option>
                    </select>
                </header>
                <div className="flex flex-col items-center">
                    {weatherData ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Current Weather in {selectedLocation}</h2>
                            <p className="text-lg">Temperature: {weatherData.current.temp_c}°C</p>
                            <p className="text-lg">Weather Condition: {weatherData.current.condition.text}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
