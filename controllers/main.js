//  check username ,password in post (login )request 
//  if exist create new JWT
//  send back to the front-end

//  setup the authentication so only the request with JWT can access the dashboard
const jwt= require('jsonwebtoken')
const CustomAPIError= require('../errors/custom-error')


const login= async (req,res)=>{





    //  check for username and password

    const {username,password}=req.body
    console.log(username,password)

    if(!username || !password){
throw new CustomAPIError('please provide email and password',400)
    }
//  sign method will consist three things
// 1 payload
// 2 jwt sceret
// 3 options

//  just for the demo, normally provided by DB.....
//  id and username are the payloads

const id=new Date().getDate()

    const token= jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})



    res.status(200).json({msg:"user created",token})
}

const dashboard= async(req,res)=>{
    //  these header will come from the postman

    //  some code uses in too much routers so we can't write again and again to avoid this
    //  take that code and paste it  in to the middle ware and then use that middleware
//  that code is saved in auth.js




    const authHeader=req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
       throw new CustomAPIError("no token provided",401)
    }

    //  if you want to get the token

    const token = authHeader.split(' ')[1]
    // setup the token verification
    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
       
        const luckyNumber= Math.floor(Math.random()*100)
        res.status(200).json({msg:`hello, ${decoded.username}`, secret:`here is your authorized data,your lucky number is ${luckyNumber}`})
        }catch (error) {

    throw new CustomAPIError("not authorized to access the route",401)
    
}


}

    // console.log(token)

    



  



module.exports= {login,dashboard}