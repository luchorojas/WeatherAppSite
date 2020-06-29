const fetch = require('node-fetch')

const weather = (latitud, logitud, callbackweather) => {
    // const keyweather = '38356e7fe344c0c37eb26b6235e2d00d'
    const urlweather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + logitud + '&appid=' + process.env.WEATHER_KEY + '&lang=es'

    fetch(urlweather)
    .then(res => res.json())
    .then(json => {
        if(json.cod === 200){
            const temp = json.main.temp - 273
            callbackweather(undefined, {
                temp: temp.toPrecision(3),
                humidity: json.main.humidity,
                pressure: json.main.pressure,
                description: json.weather[0].description,
                icon: json.weather[0].icon,
                wind: json.wind.speed
            })
         }else {
             callbackweather('No se pudo encontrar la ubicación', undefined)
         }      
     })
    .catch(error => callbackweather('No se pudo conectar al servicio OpenWeather', undefined));
}

module.exports = weather