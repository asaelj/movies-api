const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');


const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

//Midleware body parser
app.use(express.json());
app.use(helmet());

//routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

//Catch 404
app.use(notFoundHandler)

//Middleware de error siempre van al final
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//Lanza servidor en el puerto
app.listen(config.port, function () {
  console.log(`Listening http//localhost:${config.port}`);
})

