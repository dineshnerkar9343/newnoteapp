import React, { useContext, useEffect, useRef, useState } from 'react'
import HcourseContext from '../context/HcourseContext'
import AddHcourse from './AddHcourse';
import { Hcourseitem } from './Hcourseitem';
import { useNavigate } from 'react-router-dom'   //extra added


export const Hcourse = () => {

    const context = useContext(HcourseContext)
    let navigate = useNavigate();  //extra added
    const ref = useRef(null);
    const refClose = useRef(null);
    const {hcourses, getHcourse, editHcourse} = context;
    const[hcourse, setHcourse] = useState({ id:"", nimage:"", ntitle:"", ndescription:"", ntag:"general"})

   useEffect(() => {
     if(localStorage.getItem('token')){  //extra added
      getHcourse()
     }
     else{
       navigate("/login")    //extra added
     }

   },[])

   const updateHcourse = (currentHcourse) => {
       ref.current.click();
       setHcourse({id:currentHcourse._id, nimage:currentHcourse.image, ntitle:currentHcourse.title, ndescription:currentHcourse.description, ntag:currentHcourse.tag});
      
   }

   const handleClick = (n) => {
    n.preventDefault();
    // setHcourse({title:"", description:"", tag:""})
    editHcourse(hcourse.id, hcourse.nimage, hcourse.ntitle, hcourse.ndescription, hcourse.ntag)
    refClose.current.click();
      
  }

  const onChange = (n) => {
    setHcourse({...hcourse,[n.target.name]: n.target.value})

  }

  return (
    <>

    <AddHcourse/>
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
                <h5 className="modal-title" id="exampleModalLabel">Update About Us</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">

             {/* MODAL FORM */}

              <form className="my-3">

              <div className="mb-3">
          <label htmlFor="nimage" className="form-label">Image</label>
          <input type="text" className="form-control" name="nimage" id="nimage" value={hcourse.nimage} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>

        <div className="mb-3">
          <label htmlFor="ntitle" className="form-label">Title</label>
          <input type="text" className="form-control" name="ntitle" id="ntitle" value={hcourse.ntitle} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>
        <div className="mb-3">
          <label htmlFor="ndescription" className="form-label">Description</label>
          <input type="text" className="form-control" id="ndescription"  name="ndescription" value={hcourse.ndescription} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="ntag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="ntag" name="ntag" value={hcourse.ntag} onChange={onChange} required />
        </div>
        
        
      </form>
              
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  className="btn btn-outline-dark" onClick={handleClick} >Edit Courses</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="row my-3">
    <h2>Career Classroom's Certified <br/> Skill Courses</h2>
    {hcourses.map((hcourse)=>{
      return <Hcourseitem key={hcourse._id} updateHcourse={updateHcourse} hcourse={hcourse}/>

    })}
  </div>
  </>
  )
}
