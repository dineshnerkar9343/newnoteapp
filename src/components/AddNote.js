import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

const AddNote = () => {
    

    const context = useContext(NoteContext)
    const {addNote} = context;
    const[note, setNote] = useState({title:"", description:"", tag:"general"})

    const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      setNote({title:"", description:"", tag:""})
        
    }

    const onChange = (e) => {
      setNote({...note,[e.target.name]: e.target.value})

    }

  return (
    <>
     <form className="my-3">
        <div className="mb-3">
          <h2>Create Notes</h2>
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name="title" id="title" value={note.title} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description"  name="description" value={note.description} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} required />
        </div>
        
        <button type="submit" className="btn btn-dark" onClick={handleClick}>Add Note</button>
      </form>
      <br></br>
    </>
  )
}

export default AddNote