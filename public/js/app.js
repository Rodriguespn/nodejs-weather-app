const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#weather-input')
const messageSuccess = document.querySelector('#weather-success-message')
const messageError = document.querySelector('#weather-error-message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    console.log(location)

    const url = `/weather?address=${location}`

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.error(data.error)
                messageSuccess.textContent = ""
                messageError.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.current)
                console.log(data.forecast)
                messageSuccess.textContent = `The current weather in ${data.location} is ${data.current.weather_descriptions[0].toLowerCase()}`
                messageError.textContent = ""
            }
        })
    })
})
