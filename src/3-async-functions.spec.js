const assert = require("assert")
const nock = require('nock')

const planets1 = {
  name: "Tatooine", 
  rotation_period: "23", 
  orbital_period: "304", 
  diameter: "10465", 
  climate: "arid", 
  gravity: "1 standard", 
  terrain: "desert", 
  surface_water: "1", 
  population: "200000", 
  residents: [
      "https://swapi.co/api/people/1/", 
      "https://swapi.co/api/people/2/", 
      "https://swapi.co/api/people/4/", 
      "https://swapi.co/api/people/6/", 
      "https://swapi.co/api/people/7/", 
      "https://swapi.co/api/people/8/", 
      "https://swapi.co/api/people/9/", 
      "https://swapi.co/api/people/11/", 
      "https://swapi.co/api/people/43/", 
      "https://swapi.co/api/people/62/"
  ], 
  films: [
      "https://swapi.co/api/films/5/", 
      "https://swapi.co/api/films/4/", 
      "https://swapi.co/api/films/6/", 
      "https://swapi.co/api/films/3/", 
      "https://swapi.co/api/films/1/"
  ], 
  created: "2014-12-09T13:50:49.641000Z", 
  edited: "2014-12-21T20:48:04.175778Z", 
  url: "https://swapi.co/api/planets/1/"
}


describe("Assignment 3 - async", function() {
  afterEach(function() {
    nock.cleanAll()
  });

  it("JS file should exist, and should have named exports", function() {
    const {
      getTatooineResidents,
      promiseMeAString,
    } = require("./async-functions")
    assert.strictEqual(
      typeof getTatooineResidents,
      "function",
      "async-functions should export a function called getTatooineResidents"
    )
    assert.strictEqual(
      typeof promiseMeAString,
      "function",
      "async-functions should export a function called promiseMeAString"
    )
  })

  it('getTatooineResidents should make a request to https://swapi.co/api/planets/1/', function(done){
    // Intercept request and respond with a fake response
    const api = nock('https://swapi.co/api')
      .get('/planets/1/')
      .reply(200, planets1)

    // require function from file
    const { getTatooineResidents } = require('./async-functions')

    try {
      // call function
      getTatooineResidents()

      // check if request was made to api
      assert.strictEqual(
        api.isDone(),
        true,
        'No request has been made to https://swapi.co/api/planets/1/'
      )
        
      // everything is ok
      done()
    } catch(err){
      // Some error happened, display the output of the error
      done(err)
    }
  })

  it('getTatooineResidents shoud return a promise', function(done){
    // Intercept request and respond with a fake response
    nock('https://swapi.co/api')
      .get('/planets/1/')
      .reply(200, planets1)

    // require function from file
    const { getTatooineResidents } = require('./async-functions')

    try {
      // call function
      const p1 = getTatooineResidents()
  
      // check if it returns a promise
      assert(p1 instanceof Promise, `getResidents should return a promise, it returned: ${p1}`)

      //everything is ok
      done()
    } catch(err){
      // Some error happened, display the output of the error
      done(err)
    }
  })

  it('getTatooineResidents should return a promise which resolves with an array of urls for the residents of Tatooine', function(done){
    // Intercept request and respond with a fake response
    const api = nock('https://swapi.co/api')
      .get('/planets/1/')
      .reply(200, planets1)

    // require function from file
    const { getTatooineResidents } = require('./async-functions')

    // call the function and request the resolved value of the promise
    getTatooineResidents()
      .then(residents => {
        // check if the promise resolved with an array of resident urls
        assert.deepStrictEqual(
          residents,
          planets1.residents,
          `
          The function should a return promise which resolves with an array of urls for the residents of Tatooine like : 
            [
              ${planets1.residents.map(url => `\n              "${url}"`)} \n
            ] 
          the promise that was returned from you function resolved with: ${residents}`
        )

        // everything is ok
        done()
      })
      // catch errors and display the output
      .catch(done)
  })

  it('promiseMeAString should return a Promise', function(done) {
    // Import function
    const { promiseMeAString } = require("./async-functions")

    try {
      // call function
      const p1 = promiseMeAString('I Promise!')

      // check if it returns a promise
      assert(p1 instanceof Promise, `promiseMeAString should return a Promise, instead it returned: ${p1}`)

      done()
    } catch(err){
      // catch errors and display the output
      done(err)
    }
  })

  it('when promiseMeAString a called with a string as an argument it should return a Promise which resolves with a string of "You kept the Promise!"', function(done){
    // Import function
    const { promiseMeAString } = require("./async-functions")

    try {
      // call function with a string
      promiseMeAString('I Promise!')
        .then(result => {
          try {
            // check if promise resolves with the correct value
            assert.strictEqual(
              result,
              "You kept the Promise!",
              `promiseMeAString did not resolve with "You kept the Promise!", it resolved with: ${result}`
            )
            // everything went well
            done()
          } catch(err){
            done(err)
          }
        })
        // promise did not resolve
        .catch(done)
    } catch(err){
      // something else went wrong, display output
      done(err)
    }
  })

  it('when promiseMeAString a called with a null as an argument it should return a Promise which rejects with a string of "You have failed me!"', function(done){
    // import function
    const { promiseMeAString } = require("./async-functions")
    try {
      // call function with null
      promiseMeAString(null)
        .then(result => {
          // it should not resolve, so we shouldn't get here
          // throw an error if we do
          try {
            assert.strictEqual(
              true,
              false,
              'promiseMeAstring was called with null, but your promise resolves instead of rejects'
            )
          } catch(err){
            // display output if the promise was resolved
            done(err)
          }
        })
        .catch(err => {
          // the promise should reject so we should end up here
          try {
            // check if the error is the correct string
            assert.strictEqual(
              err,
              "You have failed me!",
              `promiseMeAString did not reject with "You have failed me!", it rejected with: ${err}`
            )
            // everything went well
            done()
          } catch(err){
            // something went wrong, display output
            done(err)
          }
        })
        // something else went wrong display output
    } catch(err){
      done(err)
    }
  })
})

