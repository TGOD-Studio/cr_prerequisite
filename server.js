const express = require('express');
const request = require('request');

const app = express();

app.get("/", (req, res) => {
    let city = req.query.city;
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=080a30ba08a5db5fbb7244fed26c611f`,
            function(error, response, body){
                let data = JSON.parse(body);
                let celciusTemp = data.main.temp - 273.15;

                if (response.statusCode === 200){
                    res.send(`temp is ${celciusTemp}`);
                }
            }); 
    //console.log(req.query.pussy);
});


//PORT3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`You are on port ${PORT}`);
});