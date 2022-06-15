const express = require('express')
const router = express.Router();
const Hapro = require('../models/Hapro');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1: fetch all the hapros
router.get('/fetchallhapros',fetchuser, async(req,res)=>{

    try{
    const hapros = await Hapro.find({user: req.user.id})
    res.json(hapros)
    }catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
    }      

})

//Route 2: create or add hapros
router.post('/addhapro', fetchuser, [
   body('title','enter valid title').isLength({min:3}),
   body('description','enter valid description').isLength({min:3})
], async (req,res) => {

    try{
    const {title, description, tag} = req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

const hapro = new Hapro({
    title, description, tag, user: req.user.id
})


const savedHapro = await hapro.save()

res.json(savedHapro)
    } catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      

})

//Route 3: update hapro
router.put('/updatehapro/:id', fetchuser, async(req,res)=>{
    const {title, description, tag} = req.body;


    try{
        const newHapro = {};
        if(title){ newHapro.title = title};
        if (description) { newHapro.description = description};
        if (tag) {newHapro.tag = tag};

      let hapro = await Hapro.findById(req.params.id)

      if(!hapro) {return res.status(404).send("Note not found")}

      if( hapro.user.toString() !== req.user.id){
          return res.status(401).send("you are not allowed to update the note");
      }

      //update
     hapro = await Hapro.findByIdAndUpdate(req.params.id, {$set: newHapro}, {new:true})

     res.json({hapro})

      }catch (error) {
       console.log(error.mesage);
          res.status(500).json({ errors: "some error occured" });
       }      

})

//Route 4: DALETE NOTE
router.delete('/deletehapro/:id', fetchuser, async(req,res) =>{

try{

let hapro = await Hapro.findById(req.params.id)

if(!hapro){return res.status(401).send("not found")}

if( hapro.user.toString() !== req.user.id){
   return res.status(401).send("you are not allowed to delete the note");
}

 hapro = await Hapro.findByIdAndDelete(rea.params.id)
 res.json({"sucess":"successfully deleted", hapro:hapro})


}catch (error) {
       console.log(error.mesage);
          res.status(500).json({ errors: "some error occured" });
       }      
})


module.exports = router