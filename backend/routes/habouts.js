const express = require('express')
const router = express.Router();
const Habout = require('../models/Habout');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1: fetch all the habouts
router.get('/fetchallhabouts',fetchuser, async(req,res)=>{

    try{
    const habouts = await Habout.find({user: req.user.id})
    res.json(habouts)
    }catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      

})

//Route 2: create or add habouts
router.post('/addhabout', fetchuser, [
   body('title','enter valid title').isLength({min:3}),
   body('description','enter valid description').isLength({min:3})
], async (req,res) => {

    try{
    const {title, description, tag, tag2} = req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

const habout = new Habout({
    title, description, tag, tag2, user: req.user.id
})


const savedHabout = await habout.save()

res.json(savedHabout)
    } catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      

})

//Route 3: update habout
router.put('/updatehabout/:id', fetchuser, async(req,res)=>{
     const {title, description, tag, tag2} = req.body;


     try{
         const newHabout = {};
         if(title){ newHabout.title = title};
         if (description) { newHabout.description = description};
         if (tag) {newHabout.tag = tag};
         if (tag2) {newHabout.tag2 = tag2};

       let habout = await Habout.findById(req.params.id)

       if(!habout) {return res.status(404).send("Habout not found")}

       if( habout.user.toString() !== req.user.id){
           return res.status(401).send("you are not allowed to update the habout");
       }

       //update
      habout = await Habout.findByIdAndUpdate(req.params.id, {$set: newHabout}, {new:true})

      res.json({habout})

       }catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      

})

//Route 4: DALETE NOTE
router.delete('/deletehabout/:id', fetchuser, async(req,res) =>{

try{

let habout = await Habout.findById(req.params.id)

if(!habout){return res.status(401).send("not found")}

if( habout.user.toString() !== req.user.id){
    return res.status(401).send("you are not allowed to delete the habout");
}

  habout = await Habout.findByIdAndDelete(req.params.id)
  res.json({"sucess":"successfully deleted", habout:habout})


}catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      
})



module.exports = router