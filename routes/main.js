

const express= require('express')
//  routers

const router= express.Router()


//  export functions from controllers
const {login, dashboard}= require('../controllers/main')




const authMiddleware= require('../middleware/auth')

router.route('/dashboard').get(authMiddleware,dashboard)
router.route('/login').post(login)

module.exports= router 