const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//COnfiguracion de express paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set handlebars views y ubicacion
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set carpeta static donde el servidor publica
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lucho'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Somos una empresa con buena gente',
        name: 'Lucho'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ayuda',
        contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        name: 'Lucho'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debe ingresar address'
        })
    } 

    geocode(req.query.address, (error, {latitud,longitud,localizacion} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        weather(latitud, longitud, (error, dataWeather) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                localizacion,
                clima: dataWeather
            })
        })
    })

    // res.send({
    //     localizacion: req.query.address,
    //     clima: '25 grados celcius'
    // })
})

app.get('/help/*', (req, res) => {
    res.render('nothelp', {
        title: '404 Ayuda',
        contenido: 'Documento de ayuda no encontrado',
        name: 'Lucho'
    })
})

app.get('*', (req, res) => {
    res.render('notfound',{
        title: '404',
        contenido: 'Página no econtrada',
        name: 'Lucho'
    })
})

app.listen(3000, () => {
    console.log('El servidor esta activo en el puerto 3000')
})

//ver video 08-03