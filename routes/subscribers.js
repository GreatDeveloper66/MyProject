const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

//getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err });

    }
})

//getting one
router.get('/:id', getSubscriber, (req, res) => {
    //res.send(res.subscriber.name);
    res.json(res.subscriber);
})


//creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})  // :id is a parameter

//updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await Subscriber.findByIdAndUpdate(req.params.id, res.subscriber, { new: true });
        res.status(200).json({"message": "PATCH operation successful", "New Subscriber": updatedSubscriber});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    try {
        const updatedSubscriber = await Subscriber.findByIdAndUpdate(req.params.id, res.subscriber, { new: true });
        res.status(200).json({"message": "PUT operation successful", "New Subscriber" : updatedSubscriber});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});





//deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try{
        await res.subscriber.deleteOne();
        res.json({ message: 'Deleted Subscriber' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
})  // :id is a parameter  

router.delete('/', async (req, res) => {
    try{
        await Subscriber.deleteMany();
        res.json({ message: 'Deleted All Subscribers' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
})  // :id is a parameter




async function getSubscriber(req, res, next) {
    let subscriber;
    req.params.id = req.params.id.trim();
    try {
        
        subscriber = await Subscriber.findById(req.params.id);
        if (subscriber == null || subscriber == undefined) {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router