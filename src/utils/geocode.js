//pk.eyJ1IjoiYWhtZWQtLXNhbWlyIiwiYSI6ImNrOHdhbnlzZjAwanUzbWxmcDFyOXQ3ZzEifQ.eMBMXj6NypsL7K1Gl5MB1w
const request = require('request')
const geocode = (adress , callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=pk.eyJ1IjoiYWhtZWQtLXNhbWlyIiwiYSI6ImNrOHdhbnlzZjAwanUzbWxmcDFyOXQ3ZzEifQ.eMBMXj6NypsL7K1Gl5MB1w'
    request({url, json: true},(error, response)=>{

        if(error){
            callback('connection error',undefined)
        }
        else if(typeof response.body === 'string'){
            callback('locatin not found',undefined)
        }else {
            const data = {
                latitude: response.body.features[0].center[1] ,
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }
            callback(undefined,data) 
        }
    })
}

module.exports = geocode