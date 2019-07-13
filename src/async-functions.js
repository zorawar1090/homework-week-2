const superagent = require('superagent')

const getTatooineResidents = () =>  superagent
.get('https://swapi.co/api/planets/1/')
.then(res => res.body.residents)
.catch(err => console.log(err.message))

const promiseMeAString = (string) =>{
    return new Promise((resolveFunction, rejectFunction) => {
        if(string !== null){
            resolveFunction('You kept the Promise!')
        }else{
            rejectFunction('You have failed me!')
        }
    })
}

module.exports = { getTatooineResidents, promiseMeAString}