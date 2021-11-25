const request = require('request')

const geocode = (address, callback) => {
    const MAP_BOX_ACCESS_KEY = "pk.eyJ1Ijoicm9kcmlndWVzcG4iLCJhIjoiY2t3YjJ4a3VoMWpyZTJ2cGF2NDhuNmR6eSJ9.UxL2i8sRNEckEZ1rTsTGcQ"

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAP_BOX_ACCESS_KEY}`

    request({ url: url, json: true }, (error, response) => {
        const { body:data } = response

        console.log(error)
        console.log(data)

        if (error) {
            callback(error, undefined)
        } else if (data.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const { features } = data

            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name,
            })
        }
    })
}

module.exports = geocode