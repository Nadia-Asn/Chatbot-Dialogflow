const server = express();
//tells the system whether you want to use a simple algorithm for shallow parsing (i.e. false) 
//or complex algorithm for deep parsing that can deal with nested objects (i.e. true).
server.use(bodyParser.urlencoded({
    extended: true
}));

//tells the system that you want json to be used
server.use(bodyParser.json());