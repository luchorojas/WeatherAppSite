const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000 //Puerto de heroku

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
        title: 'Primera app creada',
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
        weather(latitud, longitud, (error, {temp, humidity, description, icon, pressure, wind}) => {
            if (error) {
                return res.send({error})
            }
            res.send({localizacion, temp, humidity, description, icon, pressure, wind})
        })
    })
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

app.listen(port, () => {
    console.log('El servidor esta activo en el puerto ' + port)
})

//Ver Video 09-05