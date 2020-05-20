const fetch = require('node-fetch')

const weather = (latitud, logitud, callbackweather) => {
    const keyweather = '38356e7fe344c0c37eb26b6235e2d00d'
    const urlweather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitud + '&lon=' + logitud + '&appid=' + keyweather

    fetch(urlweather)
    .then(res => res.json())
    .then(json => {
        if(json.cod === 200){
            const temp = json.main.temp - 273
            callbackweather(undefined, 'La temperatura actual es de '+ temp.toPrecision(3) + ' °C y la humedad del '+ json.main.humidity +'%')
         }else {
             callbackweather('No se pudo encontrar la ubicación', undefined)
         }      
     })
    .catch(error => callbackweather('No se pudo conectar al servicio OpenWeather', undefined));
}

module.exports = weather