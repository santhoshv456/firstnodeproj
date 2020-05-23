const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Rental,validate} = require('../models/Rental');
const {Movie} = require('../models/movies');
const {Customer} = require('../models/customer');
const Fawn = require('fawn');
const mongoose = require('mongoose');


Fawn.init(mongoose);

router.get('/', async(req,res) => {
       const rentals = await Rental.find().sort({dateOut:-1});
       return res.send(rentals);
});


router.post('/',auth,async(req,res) => {
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     const customer = await Customer.findById(req.body.customerId);
     if(!customer) return res.status(400).send('Invalid Customer');

     const movie = await Movie.findById(req.body.movieId);
     if(!movie) return res.status(400).send('Invalid Movie');

     if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

     let rental = new Rental({
         customer: {
             _id: customer._id,
             name: customer.name,
             phone: customer.phone
         },
         movie: {
             _id: movie._id,
             title: movie.title,
             dailyRentRate: movie.dailyRentRate
         }
     });

    try {

        new Fawn.Task()
        .save('rentals',rental)
        .update('movies',{_id: movie._id}, {
            $inc: { numberInStock:-1}
        })
        .run();

        res.send(rental);

    } catch (ex) {
        //console.log(error);
        res.status(500).send('Transaction Failed...');
    }
});

module.exports = router;
 