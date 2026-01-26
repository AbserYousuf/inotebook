const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Notes");
const getuser = require("../Middleware/getuser");
// Create Notes logic
router.post(
  "/createnotes",
  getuser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title's Length should be At-Least of 3 characters"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description's Length should be At-Least of 5 characters"),
    
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const { title, description } = req.body;
      
      const userId = req.info.id;
      const notes = await Note.create({
        title: title,
        description: description,
        
        user: userId,
      });
      return res.json({ notes: notes });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server Error");
    }
  }
)

router.get('/getnotes',getuser,async(req,res)=>{
   try {
    const userId = req.info.id
    const notes = await Note.find({user:userId})
    return res.json({notes:notes})
   } catch (error) {
    console.log(error)
    return res.status(500).send("Internal server error")
   }
})

// UPDATE Notes logic
router.put('/updatenotes/:id',getuser,async(req,res)=>{
   
  const notesId= req.params.id 
  try {
     const notes = await Note.findById(notesId)
    const userId = req.info.id
     if(notes.user.toString() !== userId){
      return res.status(401).json({error:"Access denied"})
     }
     const newNotes={}
     const {title,description}=req.body
     if(title){newNotes.title=title}
     if(description){newNotes.description=description}
    
     const updatedNotes = await Note.findByIdAndUpdate(notesId,{$set:newNotes},{new:true})
     return res.json({notes:updatedNotes})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error:"Internal server Error"})
  }
   
})
router.delete('/deletenotes/:id',getuser,async(req,res)=>{
  const notesId= req.params.id 
  try {
     const notes = await Note.findById(notesId)
     if(!notes){
      return res.status(404).json({error:"NOT FOUND"})
     }
    const userId = req.info.id
     if(notes.user.toString() !== userId){
      return res.status(401).json({error:"Access denied"})
     }
     const deletednotes= await Note.findByIdAndDelete(notesId)
       return res.json({msg:"Successfully deleted"})
    }
     catch(error){
      console.log(error)
      return res.status(500).send("Internal server error")
     }
})
module.exports = router;
