// require dependencies
let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
//let mongoose = require('mongoose');
let Routes = require('./routes.js');
let nodeCron = require('node-cron');
//let { ApolloServer } = require('apollo-server-express');
//let { typeDefs, resolvers } = require('./schemas')
let axios = require('axios'); 

// define port (feel free to change this) and express app
let port = process.env.PORT || 3000;
let app = express();

// new - apollo server
/* const server = new ApolloServer({
	typeDefs,
	resolvers,
  }); */


// new - if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
  }


// URI ,arguments, Callback function - if else if not able to connect, new - connect to database (feel free to change the connection info or name of the database)
/* mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/challengeapp',
{useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false }, 
(err) => {
	if (err) {
		console.log("Error connecting to database:", err);
	} else {
		console.log("Successfully connected to database!");
	}
} ); */



// mount middleware
app.use(logger('common'));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// app routes - express
Routes(app);

// listen for connections
// app.server = app.listen(port, (err) => {

function getTracking() {
		axios.get('https://automation.bigdaddyunlimited.com/tracking_data.json')
		  .then(response => {
			console.log(response.data);
			  }).catch(error => {
			console.log(error);
			  });
			}

app.listen(port, (err) => {	
	if (err) {
		console.log("Error starting server:", err);
	} else {
		console.log("Server started on port:", port);
		//console.log(`GraphQL at http://localhost:${port}${server.graphqlPath}/`);
		
		//job will be perfomed every hour
		const job = nodeCron.schedule("*/5 * * * * *", () => {
			// console.log('hey, it works!');

			// fet json url: https://automation.bigdaddyunlimited.com/tracking_data.json

			// return app.get("https://automation.bigdaddyunlimited.com/tracking_data.json", (req, res) => {
			// 	//res.sendFile("app.html", { root: __dirname + "/public/html" });
			// 	console.log(res.json());
			
		// 	let url = "https://automation.bigdaddyunlimited.com/tracking_data.json";
		// 	//to get from json file from url

		// 	let settings = { method: "Get" };

		// 	fetch(url, settings).then(res => res.json()).then((json) => {
		// 		// do something
		// 		console.log(json.)
		// 	})
		// });
		
		// app.get('/', function (res) {
		// 	let url = 'https://automation.bigdaddyunlimited.com/tracking_data.json';
			 
		// 	fetch(url)
		// 	.then(res => res.json())
		// 	.then(data => {
		// 		res.send({ data });
		// 		console.log(data)
		// 	})
		// 	.catch(err => {
		// 		res.send(err);
		// 	});
		// });
		console.log('app is running every 5 seconds')
		console.log(getTracking())
		
			//push to mongo
		  return job.start()
		});
	}
});
