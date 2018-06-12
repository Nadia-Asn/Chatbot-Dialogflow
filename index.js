const express = require('express')
const cors = require('cors')
const server = express()
const axios = require('axios');


server.use(cors({ origin: 'http://localhost:4200' , credentials :  true}))

server.post('/chatbotApi', (req, res) => {
    console.log("everything ok ")
        var filtres = []
        // get request options
        const options = {
            url:'https://nocibe.rec.moc1.pictime.fr/ws-mobilite/search/full?searchKey=channel',
            method: 'GET',
            headers: {
              'apiKey': '765EEABF6D18DA358B543A6E16F48'
          }
        }
        console.log(res)
    
        return axios(options)
        .then(response => {
          console.log(response.data.filtres)
        });

});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...")
});