const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Home page route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Pedro Rodrigues"
    })
})

// About page route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Pedro Rodrigues'
    })
})

// Help page route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text.',
        name: "Pedro Rodrigues"
    })
})

// Weather api endpoint
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.json({
            error: 'You must provide an address'
        })
    }

    const { address } = req.query

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.json({ error })
        } else {
            forecast(longitude, latitude, (error, { current, forecast } = {}) => {
                if (error) {
                    return res.json({ error })
                } else {
                    return res.json({
                        current,
                        forecast,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('error-message', {
        title: 'error',
        errorMessage: 'Help article not found',
        name: 'Pedro Rodrigues'
    })
})

app.get('*', (req, res) => {
    res.render('error-message', {
        title: '404 Page Not Found',
        errorMessage: 'Page not found',
        name: 'Pedro Rodrigues'
    })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})