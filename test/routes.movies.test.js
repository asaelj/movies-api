const assert = require('assert');
const proxyquire = require('proxyquire');

const { moviesMocks, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer');

//Describe es una funcion de mocha
describe('routes - movies', function(){
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  });

  const request = testServer(route);

  describe('GET /movies', function(){
    it('Deberia responder con un status 200', function(done){
      request.get('/api/movies').expect(200, done)
    });

    it('Deberia reponder con la lista de peliculas', function(done){
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMocks,
          message: 'movies listed'
        });
        done();
      })
    })
  });

});