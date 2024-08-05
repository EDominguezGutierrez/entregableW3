const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const routerMovie = require('../routes/movie.router');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');


// --> GET
const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({ include: [ Genre, Actor, Director ]});
    return res.json(results);
});


// --> POST
const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});


// --> GET
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});


// --> DELETE
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});


// --> PUT
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});



// --> Esto lo vamos a hacer en el controller de donde va a quedar la unión:

//     /movies/:id/genres
const setMovieGenres = catchError(async (req, res) => {
    
// 1 Identificamos la pelicula, de acuerdo a su ID
        const { id } = req.params
        const movie = await Movie.findByPk(id)

// 2 Seteamos los géneros a las peliculas
        await movie.setGenres(req.body) // --> Seteamos lo que está en la body. Es decir, entramos a req y seteamos lo que está en la body. Me traera el Json en formato de array

// 3 Obtengo lo que se seteó
        const genres = await movie.getGenres() // --> Aplico el Get

 // 4 Retorno lo q se seteó
    return res.json(genres)
})


//     /movies/:id/actors
const setMovieActor = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    await movie.setActors(req.body)
    const actors = await movie.getActors()
    return res.json(actors)
})

//     /movies/:id/directors
const setMovieDirector = catchError(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByPk(id)
    await movie.setDirectors(req.body)
    const director = await movie.getDirectors()
    return res.json(director)
})


// -->   QUE NO SE OLVIDE EXPORTARLO
// -->   SE IMPORTA en router así:
        // routerMovie.route('/:id/courses')
        //     .post(setMovieActor)

 // -->  EN POSTMAN 
// -->   Se pasan Con el método POST en un arreglo se crean los datos de la tabla pivote, ejemplo [2,3]

   
 // -->  PARA HACER LA RELACIÓN DE TABLAS EN los controladores en el GetAll en findAll ({ includes: []})

  
  
  module.exports = {
      getAll,
      create,
      getOne,
      remove,
      update,
      setMovieGenres,
      setMovieActor,
      setMovieDirector
  }
  










