import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

const AddNote = () => {
    

    const context = useContext(NoteContext)
    const {addNote} = context;
    const[note, setNote] = useState({title:"", description:"", tag:"general"})

    const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
        
    }

    const onChange = (e) => {
      setNote({...note,[e.target.name]: e.target.value})

    }

  return (
    <>
     <form>
        <div className="mb-3">
          <h2>Create Notes</h2>
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" name="title" id="title" onChange={onChange}  aria-describedby="emailHelp" />
          
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" onChange={onChange} name="description" />
        </div>
        
        <button type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
      </form>
      <br></br>
    </>
  )
}

export default AddNote