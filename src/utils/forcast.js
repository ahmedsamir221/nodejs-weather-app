//cfd190aa981843798bfac74c50fa2f06
const request = require('request')
const forcast = (lat ,long , callback)=>{
    const url ='https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long +'&units=metric&appid=cfd190aa981843798bfac74c50fa2f06'
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('connection error',undefined)
        }
        else if(body.cod === "404"){
            callback('locatin not found',undefined)
        }else {
            const data = {
                curtemp: body.current.temp 
            }
            callback(undefined,data) 
        }
    })
}

module.exports = forcast