// Import every thing that you will use to access get, post, put and delete request;
const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

// Array of data that contain genres of movies;
const genres = [
  {id: 1, genreName: 'Action Movies', moviesNumber: 5, movies: ['The Seven Samurai', 'Bonnie and Clyde', 'Reservoir Dogs', 'Airplane', 'Doctor Zhivago']},
  {id: 2, genreName: 'Mind Fuck Movies', moviesNumber: 5, movies: ['The Deer Hunter', 'Close Encounters of the Third Kind', 'Up', 'Rocky', 'Memento']},
  {id: 3, genresName: 'Black Comedy Movies', moviesNumber: 5, movies: ['Braveheart', 'Slumdog Millionaire', 'The Lord of the Rings: The Return of the King', 'Beauty and the Beast']},
  {id: 4, genresName: 'Science Fiction Movies', moviesNumber: 5, movies: ['Seven', 'Inception', 'Die Hard', 'The Lord of the Rings: The Fellowship of the Ring', 'Amadeus']}, 
];

// Check Validation for any genres;
const checkValidation = (genre) => {
  const schema = Joi.object({
    genreName: Joi.string().min(4).required(),
    moviesNumber: Joi.number().required(),
    movies: Joi.array().min(5).required(),
  });
  return schema.validate(genre);
}

// Get request;
app.get('/genres/movies', (req, res) => {
  res.send(genres);
});

// Get request with Specific;
app.get('/genres/movies/:id', (req, res) => {
  // Check if id is exist;
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre wiht your specified ID Not Found.');
  }
  // return specific genre with id; 
  res.send(genre);
});

// Post request;
app.post('/genres/movies', (req, res) => {
  
  // Check validation of incoming data;
  const { error } = checkValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  // Create the new data that user want to add;
  const newGenre = {
    id: genres.length + 1,
    genreName: req.body.genreName,
    moviesNumber: req.body.moviesNumber,
    movies: req.body.movies,
  };
  genres.push(newGenre);
  // return new data to user;
  res.send(newGenre);
});

// Put request based on ID;
app.put('/genres/movies/:id', (req, res) => {
  // Check if elemnt exist;
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre wiht your specified ID Not Found.');
  }
  // Check validation of data;
  const { error } = checkValidation(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  genre.genreName = req.body.genreName;
  genre.moviesNumber = req.body.moviesNumber;
  genre.movies = req.body.movies;
  res.send(genre);
});

// Delete request based on id;
app.delete('/genres/movies/:id', (req, res) => {
  // Check if id not exist;
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(404).send('The genre wiht your specified ID Not Found.');
  }
  // Find index to remove data;
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));
