const express = require('express')
const cors = require('cors')
const server = express()
const axios = require('axios');

var bodyParser = require('body-parser');
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
    extended: true
}))

server.use(cors({ origin: 'http://localhost:4200' , credentials :  true}))



server.post('/chatbotApi', (req, res) => {

        console.log(req.body)
        let params = req.body
        let paramsUrl = ""

        for (var value in params){
            console.log(value)
            paramsUrl+=value+"+"
        }
        var baseURL = 'https://nocibe.rec.moc1.pictime.fr/ws-mobilite/search/full?searchKey='

        baseURL+=paramsUrl

        console.log(baseURL)

        const options = {
            url:baseURL,
            method: 'GET',
            headers: {
              'apiKey': '765EEABF6D18DA358B543A6E16F48'
          }
        }    

        response = {
            url : baseURL
            };
        res.end(JSON.stringify(response));
        return axios(options)
        .then(response => {
        });
        
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...")
});