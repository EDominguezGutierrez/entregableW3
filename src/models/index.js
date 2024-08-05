const Movie = require("./Movie");
const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");


// --> modelo 'belongsToMany' pertenece a muchos...
// --> Relación: Una pelicula pertenece a muchos actores
Movie.belongsToMany(Actor, { through : 'moviesActors'}) //--> movieActor es el nombre de la tabla pivote

// --> modelo 'belongsToMany' pertenece a muchos...
// --> Relación: Un Actor pertenece a muchas peliculas
Actor.belongsToMany(Movie, { through : 'moviesActors'})

// --> modelo 'belongsToMany' pertenece a muchos...
// --> Relación: Una pelicula pertenece a muchos directores
Movie.belongsToMany(Director, { through : 'moviesDirectors'})

// --> modelo 'belongsToMany' pertenece a muchos...
// --> Relación: Un Director pertenece a muchas peliculas
Director.belongsToMany(Movie, { through : 'moviesDirectors'})

// --> modelo 'belongsToMany' pertenece a muchos...
// --> Relación: Una pelicula pertenece a muchos géneros
Movie.belongsToMany(Genre, { through : 'moviesGenres'})

// --> modelo 'belongsToMany' pertenece a muchos...
// --> Relación: Un Genre pertenece a muchos peliculas
Genre.belongsToMany(Movie, { through : 'moviesGenres'})