const express = require('express')
const router = express.Router();


router.get('/',(req,res)=>{

    a = {
        name:"dineshdanny",
        role:"admin"
    }
    res.json(a);
    

})

module.exports = router