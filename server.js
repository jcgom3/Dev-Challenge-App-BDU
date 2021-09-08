// require dependencies
let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let request = require('request')
let mongoose = require('mongoose').set('debug', true);
let Routes = require('./routes.js');
let nodeCron = require('node-cron');
let Tracking = require('./models/tracking.js');
let axios = require('axios');
let { db } = require('./models/tracking.js');
 ;
// define port 
let port = process.env.PORT || 3000;
let app = express();


// new - if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
// URI ,arguments, Callback function - if else if not able to connect, new - connect to database (feel free to change the connection info or name of the database)
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/challengeapp',
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/challengeapp',
{
useNewUrlParser: true,
useUnifiedTopology: true,
// useCreateIndex: true,
useFindAndModify: true }, 
(err) => {
    if (err) {
        console.log("Error connecting to database:", err);
    } else {
        console.log("Successfully connected to database!");
    }
} );


// mount middleware
app.use(logger('common'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// app routes - express
Routes(app);

let data1 = [];

function getTracking() {
        axios.get('https://automation.bigdaddyunlimited.com/tracking_data.json')
          .then(response => {
                // data1 = JSON.stringify(response.data);
                // data1 = response.data
                data1 = response.data
              })
              .catch(error => {
            console.log(error);
              });
            }

getTracking();

  //  db.collection("BDUChallenge").insertOne(tracking, function(err,res) {
  //   if (err) return console.error(err);
  //   console.log("Data inserted successfully!"); 
  //   });


app.listen(port, (err) => { 
    if (err) {
        console.log("Error starting server:", err);
    } else {
        //invoke getTracking fx to import to server, then invoke job fx to introduce new data into collection every hour
        console.log("Server started on port:", port);

        data1.forEach((item) => {
          console.log(' -- ')
          //showing each item 
          console.log(item);
        
          //iterating each object with the schema
        let tracking = new Tracking(item);

        //saving to mongo 
        tracking.save(function(err) {
        if (err) return console.error(err);
        console.log("Data inserted successfully!"); 
        })
    })

        //job will be performed every hour
        const job = nodeCron.schedule(" */1 * * * *" ,() => {
            console.log('app is running every 3 mins')
        
            /**I am printing something **************/
            console.log("/****************I am printing something **************/")

            data1.forEach((item) => {
              console.log(' -- ')
              //showing each item 
              console.log(item);
            
              //iterating each object with the schema
            let tracking = new Tracking(item);

            //saving to mongo 
            tracking.save(function(err) {
            if (err) return console.error(err);
            console.log("Data inserted successfully!"); 
            })
        })
        
        });
  
        return job.start()
    }
});
