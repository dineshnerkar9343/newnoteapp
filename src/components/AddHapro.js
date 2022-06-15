import React, { useContext, useState } from 'react'
import HaproContext from '../context/HaproContext'

const AddHapro = () => {
    

    const context = useContext(HaproContext)
    const {addHapro} = context;
    const[hapro, setHapro] = useState({title:"", description:"", tag:""})

    const handleClick = (e) => {
      e.preventDefault();
      addHapro(hapro.title, hapro.description, hapro.tag);
      setHapro({title:"", description:"", tag:""})
         
    }

    const onChange = (e) => {
      setHapro({...hapro,[e.target.name]: e.target.value})

    }

  return (
    <>
     <form className="my-3">
        <div className="mb-3">
          <h2>Create Approach</h2>
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name="title" id="title" value={hapro.title} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description"  name="description" value={hapro.description} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={hapro.tag} onChange={onChange} required />
        </div>
        
        <button type="submit" className="btn btn-dark" onClick={handleClick}>Add Approach</button>
      </form>
      <br></br>
    </>
  )
}

export default AddHapro