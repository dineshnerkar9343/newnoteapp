import React, { useContext, useEffect, useRef, useState } from 'react'
import HaproContext from '../context/HaproContext'
import AddHapro from './AddHapro';
import { Haproitem } from './Haproitem';
import { useNavigate } from 'react-router-dom'   //extra added


export const Hapro = () => {

    const context = useContext(HaproContext)
    let navigate = useNavigate();  //extra added
    const ref = useRef(null);
    const refClose = useRef(null);
    const {hapros, getHapro, editHapro} = context;
    const[hapro, setHapro] = useState({ id:"", etitle:"", edescription:"", etag:"general"})

   useEffect(() => {
     if(localStorage.getItem('token')){  //extra added
      getHapro()
     }
     else{
       navigate("/login")    //extra added
     }

   },[])

   const updateHapro = (currentHapro) => {
       ref.current.click();
       setHapro({id:currentHapro._id, etitle:currentHapro.title, edescription:currentHapro.description, etag:currentHapro.tag});
      
   }

   const handleClick = (e) => {
    e.preventDefault();
    // setNote({title:"", description:"", tag:""})
    editHapro(hapro.id, hapro.etitle, hapro.edescription, hapro.etag)
    refClose.current.click();
      
  }

  const onChange = (e) => {
    setHapro({...hapro,[e.target.name]: e.target.value})

  }

  return (
    <>

    <AddHapro/>
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
                <h5 className="modal-title" id="exampleModalLabel">Update Approach</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">

             {/* MODAL FORM */}

              <form className="my-3">
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" className="form-control" name="etitle" id="etitle" value={hapro.etitle} onChange={onChange}  aria-describedby="emailHelp" required /> 
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" className="form-control" id="edescription"  name="edescription" value={hapro.edescription} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" name="etag" value={hapro.etag} onChange={onChange} required />
        </div>
        
        
      </form>
              
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"  className="btn btn-outline-dark" onClick={handleClick} >Edit Approach</button>
              </div>
            </div>
          </div>
        </div>
      </div>
   
    <div className="row my-3">
    <h2>Our Smart Approach</h2>
    {hapros.map((hapro)=>{
      return <Haproitem key={hapro._id} updateHapro={updateHapro} hapro={hapro}/>

    })}
  </div>
  </>
  )
}
