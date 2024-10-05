const express = require("express");
const app = express();

app.get(express.json());

let movies = [
  { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont' },
  { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola' },
  { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan' }
];

function getMovies(){
  return movies;
}

function getMovieById(id){
  return movies.find(movie => movie.id === id);
}

function addMovie(movie){
  movies.push(movie);
  return movie;
}

app.get("/movies", (req, res)=>{
  res.json(getMovies());
});

app.get("/movies/details/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMovieById(id);
  if(movie){
    res.json(movie);
  }
  else{
    res.status(404).send("Movie not found.");
  }
});

app.post("/movies/new", (req, res)=>{
 let movieId = req.query.movieId;
 let title = req.query.title;
 let director = req.query.director;
 let addedMovie = addMovie({movieId, title, director});
 res.status(201).json(addedMovie);
});

module.exports = { app ,getMovies, getMovieById, addMovie };