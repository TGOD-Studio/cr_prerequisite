import express from 'express'
import cors from 'cors'

const app = express()

const PORT = process.env.PORT || 3215

// 200 success, 404 = not found, 400 bad request, 500 internal server error

app.use(cors())
app.get('/', async (request, response) => {
    
    let {
        query: {city}
    } = request
    if (!city)
        return response.status(400).send('Bad request')

    try{
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1493ad0764f705adea83d06d072d49bb&units=metric&lang=th`)
    
    if (data.status === 404)
        response.status(404).send('Not found')

    const result = await data.json()

    let output = {}
    output.description = result.weather[0].description
    output.temp = result.main.temp
    output.feels_like = result.main.feels_like
    output.humidity = result.main.humidity

    response.json(output)
    } catch (e) {
       console.error()  
       response.status(500).send(e.name)
    }
    
})

app.listen(PORT, () => {
    console.log('Running on Port', PORT)
})