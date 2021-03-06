const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')

const app = express() 
const port = process.env.PORT || 3000
//paths
const staticpath = path.join(__dirname,'../public')
const handlebarpath = path.join(__dirname,'../templete/views')
const partialpath = path.join(__dirname,'../templete/partial')

// set handlebar
app.set('view engine','hbs')
app.set('views',handlebarpath)
hbs.registerPartials(partialpath)

// use static
app.use(express.static(staticpath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'weather',
        name : 'homepage'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help',
        name : 'helppage'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'about',
        name : 'aboutpage'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({error : "error: enter an address"})
    }
    else if (!((address[0] >= '0' && address[0] <= '9') || (address[0] >= 'a' && address[0] <= 'z') || (address[0] >= 'A' && address[0] <= 'Z'))){
        return res.send({error : "error: enter a valid address"})
    }
    geocode(req.query.address,(error , geodata)=>{
        if(error){
              return res.send({error})
        }
        forcast(geodata.latitude, geodata.longitude , (error, weatherdata) => {
              if(error){
                  return res.send({error})
              }
              res.send({
                  temp: weatherdata.curtemp,
                  location: geodata.location,
                  address: req.query.address  
              })
        })
        
  })
})



app.get('*',(req,res)=>{
    res.render('404',{
        title : 'error',
        name : 'aboerror page',
        error: 'page not found'
        
    })
})

app.listen(port,()=>{
    console.log('done')
})