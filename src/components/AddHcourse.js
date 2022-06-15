import React, { useContext, useState } from 'react'
import HcourseContext from '../context/HcourseContext'

const AddHcourse = () => {
    

    const context = useContext(HcourseContext)
    const {addHcourse} = context;
    const[hcourse, setHcourse] = useState({image:"", title:"", description:"", tag:""})

    const handleClick = (e) => {
      e.preventDefault();
      addHcourse(hcourse.image, hcourse.title, hcourse.description, hcourse.tag);
      setHcourse({image:"", title:"", description:"", tag:""})
        
    }

    const onChange = (e) => {
      setHcourse({...hcourse,[e.target.name]: e.target.value})

    }

  return (
    <>
     <form className="my-3">
        <div className="mb-3">
          <h2>Create Courses</h2>
          <label htmlFor="image" className="form-label">Image</label>
          <input type="text" className="form-control" id="image"  name="image" value={hcourse.image} onChange={onChange} required />
        </div>

       

        <div className="mb-3">      
        <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" name="title" id="title" value={hcourse.title} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description"  name="description" value={hcourse.description} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={hcourse.tag} onChange={onChange} required />
        </div>
        
        <button type="submit" className="btn btn-dark" onClick={handleClick}>Add Courses</button>
      </form>
      <br></br>
    </>
  )
}

export default AddHcourse