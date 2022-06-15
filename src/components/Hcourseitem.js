import React, { useContext } from 'react'
import HcourseContext from '../context/HcourseContext'

export const Hcourseitem = (props) => {

  const context = useContext(HcourseContext)

   
    const {hcourse,updateHcourse} = props;
    const {deleteHcourse} = context;


  return (
  <>

  <div className="col-md-3">
        <div className="card my-3" >
        <img src={hcourse.image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{hcourse.title}</h5>
          <p className="card-text">{hcourse.description}</p>
          <p className="card-text">{hcourse.tag}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteHcourse(hcourse._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateHcourse(hcourse)}}></i>
          
        </div>
        </div>
      </div>

 
  </>
  )
}
