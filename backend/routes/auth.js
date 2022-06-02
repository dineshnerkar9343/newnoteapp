const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { find, findOne } = require('../models/User');
const bcrypt = require('bcryptjs');  // hash function password
var jwt = require('jsonwebtoken');
const JWT_SECRET = "youareawesome&";
const fetchuser = require('../middleware/fetchuser')



//Route 1: create user
router.post('/createuser',[
    //validations
    body('name','Enter valid name').isLength({min: 3}),
    body('email','Enter valid Email').isEmail(),
    body('password','password must be of 6 charactors').isLength({min: 6})

],async(req,res)=>{
  let success = false;

  //error handling
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // console.log(req.body);
     let user = await User.findOne({email: req.body.email});
     if(user){
       return res.status(400).json({ success, errors: "user already exists" });
     }

     //hash password generation
     const salt = await bcrypt.genSaltSync(10);
     const securedPass = await bcrypt.hash(req.body.password, salt)


     // create user
     user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPass,
    })

    const data = {
      user: {
       id : user.id
      }
    }

    const authtoken = jwt.sign(data, JWT_SECRET)


  //   .then(user => res.json(user))
  //   .catch(err=> {console.log(err)
  //   res.json({error: 'please enter unique email',
  // message : err.message
  //   }) //////
  // })
  // console.log(authtoken)
  success = true;
res.json({success, authtoken})
  }catch(error)
  {
     console.log(error.mesage);
     res.status(500).json({ errors: "some error occured" });
  }
})


//Route 2: Login

router.post('/login',[
  body('email','enter valid email').isEmail(),
  body('password','enter valid password').exists()
], async(req, res)=>{

  let success = false;
  const {email, password} = req.body;
try{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  //user not exists
  let user = await User.findOne({email});
     if(!user){
       return res.status(400).json({success, errors: "user not exists" });
     }

const passwordCompare = await bcrypt.compare(password, user.password);
//password comparison
if(!passwordCompare){
  return res.status(400).json({ success, errors: "login credentials are invalid" });
}     

const payload = {
  user: {
    id : user.id
  }
}

const authtoken = jwt.sign(payload, JWT_SECRET)
success = true;
res.json({success, authtoken})

} catch (error) {
  console.log(error.mesage);
     res.status(500).json({ errors: "some error occured" });
  }




})


// Route 3 : getuser

router.post('/getuser', fetchuser, async(req,res)=>{
  try{
   userId = req.user.id
     const user = await User.findById(userId).select("-password")
     res.send(user);
  }catch (error) {
    console.log(error.mesage);
       res.status(500).json({ errors: "some error occured" });
    }
})



module.exports = router