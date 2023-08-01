// JSON WEB TOKEN BASICS PROJECT
//  in this project every thing will work without database

// REQUIRE 
require('dotenv').config()
require('express-async-errors')

const express= require("express")
const app= express()
const  mainRouter= require('./routes/main')


//  every time i go to the request i will go to the main router



const notFoundMiddleware= require('./middleware/not-found')
const errorHandlerMiddleware= require('./middleware/error-handler')


//  middleware 
app.use(express.static('./public'))
//  uses for the post route
app.use(express.json())


app.use('/api/v1', mainRouter)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port= process.env.PORT || 3000

const start= async()=>{
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}


start()
