let mongoose = require("mongoose");
let { Schema } = mongoose;
let moment = require("moment");

let trackingSchema = new Schema(
  {
    ship_date: { type: String },
    tracking_number: { type: String },
    shipping_carrier: { type: String },
    shipping_method: { type: String },
    tracking_url: { type: String },
    //added timestamp for each obj
    timeStamp: {
      type: String,
      default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    },
    //added unix for each obj
    unixTimeStamp: { type: String, default: () => moment().unix() } },
  


  // //setting _id false to not have duplicate errors when adding documents to the query every hour
  // { _id: false },
  // timeStamp in ETC and in Unix
  
);




//Tracking model to be used on server and on mongodb
let Tracking = mongoose.model("Tracking", trackingSchema, "BDUChallenge");

module.exports = Tracking;
