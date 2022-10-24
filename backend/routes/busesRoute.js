const router = require("express").Router();
const authMiddlewares = require("../middlewares/authMiddlewares");
const Bus = require("../models/busModel");


//add bus
router.post("/add-bus", async (req, res) => {   
    try {
        const existingBus = await Bus.findOne({ number: req.body.number }); //check if bus already exists   
        if (existingBus) {  //  if bus exists, return error
            return res.status(400).send({ success: false, message: "Bus already exists" });
        }
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({ success: true, message: "Bus added successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Bus is not defined" });
    }
});

//get all buses
router.get("/get-all-buses", authMiddlewares, async (req, res) => {
    try {
        const buses = await Bus.find();
        return res.status(200).send({ success: true, message: "Buses fetched successfully", data: buses });


    } catch (error) {
res.status(500).send({ success: false, message: "Buses are not defined" });
    }

});
    module.exports = router;