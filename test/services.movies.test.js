const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require ('../utils/mocks/mongoLib');
const { moviesMocks } = require('../utils/mocks/movies');

describe('services - movies', function(){
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });

  const moviesServices = new MoviesServices();


  describe('when getMovies method is called', async function(){
    it('Deberia llamar getall MongoLib method', async function() {
      await moviesServices.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });
    it('Deberi retornar un array de movies', async function() {
      const result = await moviesServices.getMovies({});
      const expect = moviesMocks;
      assert.deepEqual(result, expect);
    })
  });
})