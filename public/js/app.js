const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mensaje1 = document.querySelector('#mensaje1')
const mensaje2 = document.querySelector('#mensaje2')
const mensaje3 = document.querySelector('#mensaje3')
const weatherImg = document.querySelector('#weatherImg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const ciudad = search.value
    mensaje1.textContent = 'Buscando...'
    mensaje2.textContent = ''
    mensaje3.textContent = ''
    weatherImg.src = ''

    fetch('/weather?address=' + ciudad).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mensaje1.textContent = data.error
                mensaje2.textContent = ''
                mensaje3.textContent = ''
            } else {
                mensaje1.textContent = data.localizacion
                weatherImg.src = 'http://openweathermap.org/img/w/' + data.icon + '.png'
                mensaje2.textContent = data.description
                mensaje3.textContent = 'Temp: ' + data.temp + ' | Humedad: ' + data.humidity + ' | Presión: ' + data.pressure + ' | Viento: ' + data.wind
            }
        })
    })
})