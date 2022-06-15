import React, { useContext } from 'react'
import HaproContext from '../context/HaproContext'

export const Haproitem = (props) => {

  const context = useContext(HaproContext)

   
    const {hapro,updateHapro} = props;
    const {deleteHapro} = context;


  return (
  <>

  <div className="col-md-4">
        <div className="card my-3" >
       
        <div className="card-body">
          <h5 className="card-title">{hapro.title}</h5>
          <p className="card-text">{hapro.description}</p>
          <p className="card-text">{hapro.tag}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteHapro(hapro._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateHapro(hapro)}}></i>
          
        </div>
        </div>
      </div>
  </>
  )
}
