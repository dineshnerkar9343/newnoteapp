import React, { useContext, useEffect, useRef, useState } from 'react'
import HaboutContext from '../context/HaboutContext'
import AddHabout from './AddHabout';
import { Haboutitem } from './Haboutitem';
import { useNavigate } from 'react-router-dom'   //extra added


export const Habout = () => {

    const context = useContext(HaboutContext)
    let navigate = useNavigate();  //extra added
    const ref = useRef(null);
    const refClose = useRef(null);
    const {habouts, getHabout, editHabout} = context;
    const[habout, setHabout] = useState({ id:"", ntitle:"", ndescription:"", ntag:"general", ntag2:""})

   useEffect(() => {
     if(localStorage.getItem('token')){  //extra added
      getHabout()
     }
     else{
       navigate("/login")    //extra added
     }

   },[])

   const updateHabout = (currentHabout) => {
       ref.current.click();
       setHabout({id:currentHabout._id, ntitle:currentHabout.title, ndescription:currentHabout.description, ntag:currentHabout.tag, ntag2:currentHabout.tag2});
      
   }

   const handleClick = (n) => {
    n.preventDefault();
    // setHabout({title:"", description:"", tag:""})
    editHabout(habout.id, habout.ntitle, habout.ndescription, habout.ntag, habout.ntag2)
    refClose.current.click();
      
  }

  const onChange = (n) => {
    setHabout({...habout,[n.target.name]: n.target.value})

  }

  return (
    <>

    <AddHabout/>
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
          <label htmlFor="ntitle" className="form-label">Title</label>
          <input type="text" className="form-control" name="ntitle" id="ntitle" value={habout.ntitle} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>
        <div className="mb-3">
          <label htmlFor="ndescription" className="form-label">Description</label>
          <input type="text" className="form-control" id="ndescription"  name="ndescription" value={habout.ndescription} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="ntag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="ntag" name="ntag" value={habout.ntag} onChange={onChange} required />
        </div>
        
        <div className="mb-3">
          <label htmlFor="ntag2" className="form-label">Tag2</label>
          <input type="text" className="form-control" id="ntag2" name="ntag2" value={habout.ntag2} onChange={onChange} required />
        </div>
        
      </form>
              
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  className="btn btn-outline-dark" onClick={handleClick} >Edit About Us</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="row my-3">
    <h2>About US</h2>
    {habouts.map((habout)=>{
      return <Haboutitem key={habout._id} updateHabout={updateHabout} habout={habout}/>

    })}
  </div>
  </>
  )
}
