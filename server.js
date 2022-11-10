const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const fetch = require("node-fetch")

const worldTimeApiUrl = process.env.WORLD_TIME_API;
const geoLocationUrl =`https://api.ipbase.com/v2/info?ip&apikey=${process.env.GEO_API_KEY}`
const randomQuote = process.env.RANDOM_QUOTE

const app = express()

app.use(express.json())
app.use(express.static("public"))

app.post("/api", (req, res) => {

    //fetch World Time
    Promise.all([
        fetch(worldTimeApiUrl).then(response => response.json()).then(data => {
            return data
        }),
        fetch(geoLocationUrl).then(response => response.json()).then(data => {
            return data
        }),
        fetch(randomQuote).then(response => response.json()).then(data => {
            return data
        })  
    ]).then(value=> {
        res.json(value)
    })
    
  })


app.listen(3000 , () => {
    console.log("Server listen on Port 3000");
})