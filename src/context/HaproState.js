import React, { useState } from "react";
import HaproContext from "./HaproContext";


const HaproState=(props)=>{


  const host = "http://localhost:5000"
    const haproInitial = []
const [hapros, setHapros]= useState(haproInitial)

//fetchhapros
const getHapro = async ()=>{
  const response = await fetch(`${host}/api/hapros/fetchallhapros`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')    
    }
  });

  const json = await response.json()
  console.log(json);
  setHapros(json)
}

//add hapros
const addHapro = async (title,description,tag)=>{
  console.log("Add note");
                         //http://localhost:5000/api/notes/addnote
  const response = await fetch(`${host}/api/hapros/addhapro`,{
    method : 'POST',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')   
     },
    body: JSON.stringify({title,description,tag})
  });

  const hapro = await response.json();
  setHapros(hapros.concat(hapro))

}

//update hapro
const editHapro= async(id,title,description,tag)=>{


              //http://localhost:5000/api/notes/updatenote/626a498c96de1a43ca1dd30e
  const response = await fetch(`${host}/api/hapros/updatehapro/${id}`,{
    method : 'PUT',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')    
    },
    body: JSON.stringify({title,description,tag})
  });
  const json = await response.json();

  let newHapros = JSON.parse(JSON.stringify(hapros))

  for (let index = 0; index < newHapros.length; index++) {
    const element = newHapros[index];
    if(element._id === id){
    newHapros[index].title = title;
    newHapros[index].description = description;
    newHapros[index].tag = tag;
    break;
    }
    
  }
setHapros(newHapros);
}

//delete hapro
const deleteHapro = async(id)=>{
  console.log("note deleted" + id);

  const response = await fetch(`${host}/api/hapros/deletehapro/${id}`,{
    method : 'DELETE',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')   
     }
    // body: JSON.stringify({title,description,tag})

  });

  const json = await response.json();

 const newHapros = hapros.filter((hapro)=>{return hapro._id !== id})
 setHapros(newHapros);

}



  
return(
     <HaproContext.Provider value={{hapros,addHapro,editHapro,deleteHapro,getHapro}}>
        {props.children}
     </HaproContext.Provider> 

    )

}

export default HaproState;