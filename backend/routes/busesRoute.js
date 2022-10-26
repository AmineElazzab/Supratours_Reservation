const router = require("express").Router();
const authMiddlewares = require("../middlewares/authMiddlewares");
const Bus = require("../models/busModel");


//ad d bus
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

//update bus
router.get("/update-bus", authMiddlewares, async (req, res) => {
    try {
        await Bus.findByIdAndUpdate(req.body._id, req.body);
        return res.status(200).send({ success: true, message: "Bus updated successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
});

//delete bus
router.post("/delete-bus", authMiddlewares, async (req, res) => {
    try {
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({ success: true, message: "Bus deleted successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
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

//get bus by id
router.post("/get-bus-by-id", authMiddlewares, async (req, res) => {
    try {
        const bus = await Bus.findById(req.body._id);
        return res.status(200).send({ success: true, message: "Bus fetched successfully", data: bus });
    } catch (error) {
        res.status(500).send({ success: false, message: "Bus is not defined" });
    }
});



module.exports = router;