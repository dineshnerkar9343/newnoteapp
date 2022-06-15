import React, { useContext } from 'react'
import HaboutContext from '../context/HaboutContext'

export const Haboutitem = (props) => {

  const context = useContext(HaboutContext)

   
    const {habout,updateHabout} = props;
    const {deleteHabout} = context;


  return (
  <>

 

   {/* for list type */}

   <div className="col-md-4">
       
       
          <h5>{habout.title}</h5>
          <ol>
          <li>{habout.description}</li>
          <li>{habout.tag}</li>
          <li>{habout.tag2}</li>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteHabout(habout._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateHabout(habout)}}></i>
          </ol>
        </div>
    

  </>
  )
}
