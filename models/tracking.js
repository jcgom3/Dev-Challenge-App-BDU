const { Schema, model } = require('mongoose');

const trackingSchema = new Schema ( {
   ship_date: {type: Number, require: true},
   tracking_number: {type: Number, unique:true, require: true},
   shipping_carrier: {type: String},
   shipping_method: {type: String},
   tracking_url: {type:String, require: true}

})
const Tracking = model('Tracking', trackingSchema)
module.exports = Tracking;