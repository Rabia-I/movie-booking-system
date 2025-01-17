import jwt from 'jsonwebtoken'
import Movie from '../models/Movie';
import mongoose from 'mongoose';
import Admin from '../models/Admin';



export const addMovie = async(req, res, next) => {
 const extractedToken = req.headers.authorization.split(" ")[1];
if (!extractedToken && extractedToken.trim() === ""){
    return res.status(404).json({ message: "Token not found"});
}
let adminId;
// verify token
jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted) =>{
    if (err){
        return res.status(400).json({ message: `${err.message}`});
    } else{
        adminId = decrypted.id;
        return;
    }
});
// creatte new movie
const { title, description, releaseDate, posterUrl, featured , actors} = req.body;

if (!title && title.trim()==="" && !description && description.trim()==="" && !posterUrl && !posterUrl.trim()===""){
    return res.status(422).json({ message: "inavlid input"});
}
let movie;
try{
    movie = new Movie({
description,
releaseDate: new Date(`${releaseDate}`),
featured,
actors,
admin: adminId,
posterUrl,
title,
    });
const session = await mongoose.startSession();
const adminUser = await Admin.findById(adminId);
session.startTransaction();
await movie.save({ session });
adminUser.addedMovies.push(movie);
await adminUser.save({ session});
await session.commitTransaction();
} catch (err){
    return console.log(err);
}
if(!movie){
    return res.status(500).json({message: "request failed"});
}
return res.status(201).json({ movie });

};

export const getAllMovies = async(req, res, next) =>{
    let movies;

    try{
        movies = await Movie.find();
    } catch (err) {
        return console.log(err)
    }
if (!movies){
    return res.status(500).json({message: "request failed"});
}
return res.status(200).json({ movies });
};

export const getMovieById = async(req, res, next) => {
const id = req.params.id;
let movie;
try {
    movie = await Movie.findById(id);
} catch (err){
    return console.log(err);
}
if (!movie) {
return res.status(404).json({ message: "invalid movie id"});

}
return res.status(200).json({ movie });
};

export const updateMoviesById = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body;

  // Validate input
  if (
    !title ||
    !description ||
    !releaseDate ||
    !posterUrl ||
    !featured ||
    !actors
  ) {
    return res.status(422).json({ message: "Invalid input" });
  }

  try {
    const movie = await Movie.findById(id);

    // Check if movie exists
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update movie fields
    movie.title = title;
    movie.description = description;
    movie.releaseDate = new Date(releaseDate);
    movie.posterUrl = posterUrl;
    movie.featured = featured;
    movie.actors = actors;

    // Save updated movie
    await movie.save();

    return res
      .status(200)
      .json({ message: "Movie updated successfully", movie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
