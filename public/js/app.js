
const weatherForm = document.querySelector('form')
const searsh = document.querySelector('input')
const ms1 = document.querySelector('#ms1')
const ms2 = document.querySelector('#ms2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searsh.value
    const url = 'http://localhost:3000/weather?address=' + location
    ms1.textContent="loading..."
    ms2.textContent=""
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                ms1.textContent=data.error
            }else{
                ms1.textContent=data.location
                ms2.textContent="temperature is " + data.temp +" c"
            }
        })
    })
    
})