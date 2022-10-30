const mangoose = require('mongoose');

const bookingSchema = new mangoose.Schema({
    bus: {
        type: mangoose.Schema.ObjectId,
        ref: 'buses',
        require: true
    },
    user: {
        type: mangoose.Schema.ObjectId,
        ref: 'users',
        require: true
    },
    seats: {
        type: Array,
        require: true
    },
    transactionId: {
        type: String,
        require: true
    },
},
    {
        timestamps: true,
    }

);
module.exports = mangoose.model("booking", bookingSchema);