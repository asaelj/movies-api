const express = require('express');
const MoviesServices = require('../services/movies');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const { CINCO_MINUTOS, SESENTA_MINUTOS } = require('../utils/time');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesServices = new MoviesServices();

  //Listar movies
  router.get('/', async function (req, res, next) {
    cacheResponse(res, CINCO_MINUTOS);
    const { tags } = req.query;
    try {
      const movies = await moviesServices.getMovies({ tags });
      //throw new Error('Error a proposito par ael middleware');
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (err) {
      next(err);
    }
  });

  //Recuperar movie
  router.get('/:movieId',
    validationHandler(movieIdSchema, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SESENTA_MINUTOS);
      const { movieId } = req.params;
      try {
        const movies = await moviesServices.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: 'movies retrieved'
        });
      } catch (err) {
        next(err);
      }
    });

  //Crear movie
  router.post('/',
    validationHandler(createMovieSchema),
    async function (req, res, next) {
      const { body: movie } = req;
      try {
        const createMovieId = await moviesServices.createMovie({ movie });
        res.status(201).json({
          data: createMovieId,
          message: 'movies created'
        });
      } catch (err) {
        next(err);
      }
    });

  //Actualizar movie
  router.put('/:movieId',
    validationHandler(movieIdSchema, 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      try {
        const updatedMovieId = await moviesServices.updateMovie({
          movieId,
          movie
        });
        res.status(200).json({
          data: updatedMovieId,
          message: 'movies updated'
        });
      } catch (err) {
        next(err);
      }
    });

  //Delete movie
  router.delete('/:movieId',
    validationHandler({movieId: movieIdSchema}, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;
      try {
        const deletedMoveId = await moviesServices.deleteMovie({ movieId });
        res.status(200).json({
          data: deletedMoveId,
          message: 'movies deleted'
        });
      } catch (err) {
        next(err);
      }
    });

  //Patch movie = reemplazar movie
  router.patch('/:movieId', async function (req, res, next) {
    const { body: movie } = req;
    const { movieId } = req.params;
    try {
      const replaceMoveId = await moviesServices.replaceMovie({ movieId, movie });
      res.status(200).json({
        data: replaceMoveId,
        message: 'movie reeplaced'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;