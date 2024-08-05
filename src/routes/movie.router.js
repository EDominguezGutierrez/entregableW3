const { getAll, create, getOne, remove, update, setMovieGenres, setMovieActor, setMovieDirector } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();


// --> Rutas estáticas
routerMovie.route('/')
    .get(getAll)
    .post(create);


// --> Rutas dinámicas    
routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);


// --> Rutas estáticas dinámicas

//   /movies/:id/genres
routerMovie.route('/:id/genres')
    .post(setMovieGenres)

//   /movies/:id/actors
routerMovie.route('/:id/actors')
    .post(setMovieActor)

//   /movies/:id/directors
routerMovie.route('/:id/directors')
    .post(setMovieDirector)


module.exports = routerMovie;