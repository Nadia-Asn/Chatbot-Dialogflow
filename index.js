const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const API_KEY = require('./apiKey');
const cors = require('cors');


const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(cors({ origin: 'http://localhost:4200' , credentials :  true}));


/*server.listen(8000, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
*/

// curl -H "Content-Type: application/json" -X POST -d '{<json_response_from_API.AI>}' https://your-service.com

server.use(bodyParser.json());

server.post('/get-movie-details', (req, res) => {
    console.log("tototototo");
    console.log(req.body);
    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movieName ? req.body.result.parameters.movieName : 'The Godfather';
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`);
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const movie = JSON.parse(completeResponse);
            let dataToSend = movieToSearch === 'The Godfather' ? `I dddddd't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
            dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;
            
            return res.json({
                
                speech: dataToSend,
                displayText: dataToSend,
                source: 'get-movie-details'
            });
            console.log("Response =>" + res.body)
        });
        console.log("Response =>" + res.body)
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-movie-details'
        });
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});