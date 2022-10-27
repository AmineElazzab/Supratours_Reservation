const mangoose = require('mongoose');

const bookingSchema = new mangoose.Schema({
    bus: {
        type: mangoose.Schema.ObjectId,
        ref: 'Bus',
        required: true
    },
    user: {
        type: mangoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    seats: {
        type: Array,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
    }

);
module.exports = mangoose.model("booking", bookingSchema);