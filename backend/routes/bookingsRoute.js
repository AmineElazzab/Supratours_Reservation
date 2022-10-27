const router = require('express').Router();
const authMiddlewares = require('../middlewares/authMiddlewares');
const Booking = require('../models/bookingsModel');
const Bus = require('../models/busModel');


//book a seat
router.post("/book-seat", authMiddlewares ,async (req, res) => {
    try {
        const newBooking = new Booking({
            ...req.body,
            transactionId: "1234",
            user: req.body.userId
        });
        await newBooking.save();
        const bus = await Bus.findById(req.body.bus);
        bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
        await bus.save();
        res.status(200).send({
            message: "Booking successful",
            data: newBooking,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Booking failed",
            data: error,
            success: false,
        });
    }

});
module.exports = router;
  

