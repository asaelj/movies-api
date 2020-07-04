const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js')

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

//Midleware body parser
app.use(express.json());

//routes
moviesApi(app);

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

