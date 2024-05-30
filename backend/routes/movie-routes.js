import express from 'express';
import {
  addMovie,
  getAllMovies,
  getMovieById,
  updateMoviesById
} from "../controllers/movie-controller";
const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/:id", getMovieById);
movieRouter.get("/", getAllMovies);
movieRouter.post("/:id", updateMoviesById);

export default movieRouter;