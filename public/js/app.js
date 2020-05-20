const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const clima = document.querySelector('#mensajeClima')
const error = document.querySelector('#mensajeError')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const ciudad = search.value
    clima.textContent = 'Buscando...'
    error.textContent = ''

    fetch('/weather?address=' + ciudad).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                clima.textContent = ''
                error.textContent = data.error
            } else {
                clima.textContent = '(' + data.localizacion + ') '+ data.clima
                error.textContent = ''
            }
        })
    })
})