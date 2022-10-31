const router = require('express').Router();
const authMiddlewares = require('../middlewares/authMiddlewares');
const Booking = require('../models/bookingsModel');
const Bus = require('../models/busModel');
// const User = require('../models/userModel');
const stripe = require('stripe')(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");


//book a seat
router.post("/book-seat", authMiddlewares, async (req, res) => {
    try {
        const newBooking = new Booking({
            ...req.body,
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

//make payment
router.post("/make-payment", authMiddlewares, async (req, res) => {
    try {
        const { token, amount } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const payment = await stripe.charges.create({
            amount: amount,
            currency: "MAD",
            customer: customer.id,
            receipt_email: token.email,
            description: "Bus ticket"

        },
            {
                idempotencyKey: uuidv4()
            });
        if (payment) {
            res.status(200).send({
                message: "Payment successful",
                data:
                {
                    transactionId: payment.source.id,
                },
                success: true,
            });
        }
        else {
            res.status(500).send({
                message: "Payment failed",
                data: error,
                success: false,
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Payment failed",
            data: error,
            success: false,
        });
    }
});

//get all bookings by user id
router.post("/get-bookings-by-user-id", authMiddlewares, async (req, res) => {
    try {

        const bookings = await Booking.find({ user: req.body.userId })
            .populate("bus")
            .populate("user");
        res.status(200).send({
            message: "Bookings fetched successfully",
            data: bookings,
            success: true,
        });


    } catch (error) {
        res.status(500).send({
            message: "Bookings fetching failed",
            data: error,
            success: false,
        });
    }
});
 
//cancel booking
// router.delete("/api/bookings/${booking_id}/${user_id}/${bus_id}", authMiddlewares, async(req , res)=>{
//     try{
//         const booking = await Booking.findById(req.params.booking_id);
//         const bus = await Bus.findById(req.params.bus_id);
//         const user = await User.findById(req, params.user_id);
//         if(!booking || !user || !bus){
//             res.status(404).send({
//                 message: "Booking not found",
//                 data: error,
//                 success: false,
//             });
//         }
//         booking.remove();
//         bus.seatsBooked = bus.seatsBooked.filter(
//             (seat) => !booking.seats.includes(seat)
//         );
//         await bus.save();
//         res.status(200).send({
//             message: "Booking cancelled successfully",
//             data: booking,
//             success: true,
//         });
        
//     }catch(error){
//         res.status(500).send({
//             message: "Booking cancellation failed",
//             data: error,
//             success: false,
//         });
//     }
// });


module.exports = router;


