const fetch = require('node-fetch')

const geocode = (direccion, callbackmap) => {
    const keymap = 'pk.eyJ1Ijoicm9qYXNsdWNpYW5vIiwiYSI6ImNrOWxwaXJjMTAxcmIzaG9hZjU1b2hidmIifQ.iwR5KkqAMFNjE0C6Q7F3Eg'
    const urlmap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(direccion) +'.json?access_token='+keymap+'&limit=1'
    fetch(urlmap)
    .then(res => res.json())
    .then(json => {
        if (!json.message) {
            if (json.features.length > 0) {
                callbackmap(undefined, {
                    latitud: json.features[0].center[1],
                    longitud: json.features[0].center[0],
                    localizacion: json.features[0].place_name
                })
            } else {
                callbackmap('No se encontro la ciudad', undefined)
            }
        } else {
            callbackmap(json.message, undefined)
        }
    })
    .catch(error => callbackmap('No se pudo conectar al servicio MapBox', undefined));
}

module.exports = geocode