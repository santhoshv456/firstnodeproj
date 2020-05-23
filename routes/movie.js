const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Genre} = require('../models/genre');
const {Movie, validate} = require('../models/movies');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort({title:1});
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movie);
});

router.post('/',auth ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message); 

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.'); 

  const movie = new Movie({
    title:req.body.title,
    genre:{
       _id: genre.id,
       name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  
  await movie.save();

  res.send(movie);
});

router.put('/:id', auth ,async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, 
    {title: req.body.title,
     genre:{
        _id: req.genreId,
        name: req.name
     },
     numberInStock:parseInt(req.body.numberInStock),
     dailyRentalRate: parseInt(req.body.dailyRentalRate)}, 
     { new:true });

  if (!movie) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id',auth ,async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!Movie) return res.status(404).send('The genre with the given ID was not found.');
  res.send(Movie);
});

module.exports = router;