const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const WHEATHER_API_ACCESS_KEY = "0ef568754d26d6db3c1a62a6a3d13d27"
    
    
    const url = `http://api.weatherstack.com/forecast?access_key=${WHEATHER_API_ACCESS_KEY}&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`

    request({ url: url, json: true }, (error, response) => {
        const { body:data } = response

        if (error) {
            callback(error)
        } else if (data.error) {
            callback(data.error)
        } else {
            const { current, forecast, location } = data

            callback(undefined, {
                current: current,
                forecast: forecast,
                location: location.name,
            })
        }
    })
}

module.exports = forecast