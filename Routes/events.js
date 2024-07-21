const express = require('express');
const router = express.Router();
const Events = require('../models/events');


router.post('/createEvent',
    async (req, res) => {
        try {
            let event = await User.findOne({ name: req.body.name });
            if (event) {
                return res.status(400).json({ success: false, error: "Sorry, event already exists" });
            };
            event = await Events.create({
                name: req.body.name,
                description: req.body.description,
                fromDate: req.body.fromDate,
                toDate: req.body.toDate,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                volunteers: req.body.volunteers,
                organizers: req.body.organizers,
                winners: req.body.winners,
                prizeDetails: req.body.prizeDetails
            });
            res.json({ success: true,"message":"created Successfully" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

