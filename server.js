const dotenv=require('dotenv')
const app=require('./App')



dotenv.config({path:'./config.env'})
console.log(process.env)
const port =8000 
app.listen(port,()=>{
      console.log(`App running on this port :${port}`)
})