const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f32e5df3aac321d31bf71f1dc5b2ab8d/' + latitude + ',' + longitude + '?lang=en'

    request({ url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location services : ', undefined)

        } else if (body.error) {
            callback('Unable to find location ', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' degrees out. This is a ' + body.currently.precipProbability + '% chance of rain')
        }

    })
}

module.exports = forecast