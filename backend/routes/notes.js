const express = require('express')
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//Route 1: fetch all the notes
router.get('/fetchallnotes',fetchuser, async(req,res)=>{

    try{
    const notes = await Note.find({user: req.user.id})
    res.json(notes)
    }catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      

})

//Route 2: create or add notes
router.post('/addnote', fetchuser, [
   body('title','enter valid title').isLength({min:3}),
   body('description','enter valid description').isLength({min:3})
], async (req,res) => {

    try{
    const {title, description, tag} = req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

const note = new Note({
    title, description, tag, user: req.user.id
})


const savedNote = await note.save()

res.json(savedNote)
    } catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      

})

//Route 3: update note
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
     const {title, description, tag} = req.body;


     try{
         const newNote = {};
         if(title){ newNote.title = title};
         if (description) { newNote.description = description};
         if (tag) {newNote.tag = tag};

       let note = await Note.findById(req.params.id)

       if(!note) {return res.status(404).send("Note not found")}

       if( note.user.toString() !== req.user.id){
           return res.status(401).send("you are not allowed to update the note");
       }

       //update
      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

      res.json({note})

       }catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      

})

//Route 4: DALETE NOTE
router.delete('/deletenote/:id', fetchuser, async(req,res) =>{

try{

let note = await Note.findById(req.params.id)

if(!note){return res.status(401).send("not found")}

if( note.user.toString() !== req.user.id){
    return res.status(401).send("you are not allowed to delete the note");
}

  note = await Note.findByIdAndDelete(rea.params.id)
  res.json({"sucess":"successfully deleted", note:note})


}catch (error) {
        console.log(error.mesage);
           res.status(500).json({ errors: "some error occured" });
        }      
})



module.exports = router