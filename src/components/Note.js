import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/NoteContext'
import AddNote from './AddNote';
import { Noteitem } from './Noteitem';

export const Note = () => {

    const context = useContext(NoteContext)

    const ref = useRef(null);
    const refClose = useRef(null);
    const {notes, getNote, editNote} = context;
    const[note, setNote] = useState({ id:"", etitle:"", edescription:"", etag:"general"})

   useEffect(() => {
     getNote()
   },[])

   const updateNote = (currentNote) => {
       ref.current.click();
       setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
      
   }

   const handleClick = (e) => {
    e.preventDefault();
    // setNote({title:"", description:"", tag:""})
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
      
  }

  const onChange = (e) => {
    setNote({...note,[e.target.name]: e.target.value})

  }

  return (
    <>

    <AddNote/>
    <div>
        {/* Button trigger modal */}
        <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        {/* Modal */}
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">

             {/* MODAL FORM */}

              <form className="my-3">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" className="form-control" id="edescription"  name="edescription" value={note.edescription} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required />
        </div>
        
        
      </form>
              


              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  className="btn btn-outline-dark" onClick={handleClick} >Edit Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="row my-3">
    <h2>My Notes</h2>
    {notes.map((note)=>{
      return <Noteitem key={note._id} updateNote={updateNote} note={note}/>

    })}
  </div>
  </>
  )
}
