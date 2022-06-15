import React, { useContext, useState } from 'react'
import HaboutContext from '../context/HaboutContext'

const AddHabout = () => {
    

    const context = useContext(HaboutContext)
    const {addHabout} = context;
    const[habout, setHabout] = useState({title:"", description:"", tag:"", tag2:""})

    const handleClick = (e) => {
      e.preventDefault();
      addHabout(habout.title, habout.description, habout.tag, habout.tag2);
      setHabout({title:"", description:"", tag:"", tag2:""})
        
    }

    const onChange = (e) => {
      setHabout({...habout,[e.target.name]: e.target.value})

    }

  return (
    <>
     <form className="my-3">
        <div className="mb-3">
          <h2>Create About Us</h2>
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name="title" id="title" value={habout.title} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description"  name="description" value={habout.description} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={habout.tag} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="tag2" className="form-label">Tag2</label>
          <input type="text" className="form-control" id="tag2" name="tag2" value={habout.tag2} onChange={onChange} required />
        </div>
        
        <button type="submit" className="btn btn-dark" onClick={handleClick}>Add About Us</button>
      </form>
      <br></br>
    </>
  )
}

export default AddHabout