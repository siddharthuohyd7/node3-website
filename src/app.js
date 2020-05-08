const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
    //Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
    //set Up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

c

//Setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {

        title: 'Weather app',
        name: 'Andrew Mead'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help me with corona virus',
        name: 'Siddharth Dixit'
    })
})

app.get('/weather', (req, res) => {

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })

        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })
})


// app.com
// app.com/help
// app.com/about
//Real wildcard entry 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Under Comstruction',
        name: 'Siddharth Dixit'
    })
})

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         errorMessage: 'Page Not Found',
//         name: 'Siddharth Dixit'
//     })
// })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You must provide search term ' })
    }
    res.send({ products: [] })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})