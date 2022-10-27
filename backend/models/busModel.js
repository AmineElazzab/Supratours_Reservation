const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    type: {
        type: String,
        required: true
    },
    seatsBooked: {
        type: Array,
        default: []
    },
    seatsAvailable: {
        type: Number,
        default : function() {
            return this.seats - this.seatsBooked.length
        }
        
    },
    status: {
        type: String,
        default: "Yet to start"
    },
    

});
 
module.exports = mongoose.model("buses", busSchema);