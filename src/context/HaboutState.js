import React, { useState } from "react";
import HaboutContext from "./HaboutContext";


const HaboutState=(props)=>{


  const host = "http://localhost:5000"
    const haboutInitial = []
const [habouts, setHabouts]= useState(haboutInitial)

//fetchhabouts
const getHabout = async ()=>{
  const response = await fetch(`${host}/api/habouts/fetchallhabouts`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')    
    }
  });

  const json = await response.json()
  console.log(json);
  setHabouts(json)
}

//add
const addHabout = async (title,description,tag,tag2)=>{
  console.log("Add habout");
                         //http://localhost:5000/api/habouts/addhabout
  const response = await fetch(`${host}/api/habouts/addhabout`,{
    method : 'POST',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')   
     },
    body: JSON.stringify({title,description,tag,tag2})
  });

  const habout = await response.json();
  setHabouts(habouts.concat(habout))

}

//update habout
const editHabout= async(id,title,description,tag,tag2)=>{


              //http://localhost:5000/api/habouts/updatehabout/626a498c96de1a43ca1dd30e
  const response = await fetch(`${host}/api/habouts/updatehabout/${id}`,{
    method : 'PUT',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')    
    },
    body: JSON.stringify({title,description,tag,tag2})
  });
  const json = await response.json();

  let newHabouts = JSON.parse(JSON.stringify(habouts))

  for (let index = 0; index < newHabouts.length; index++) {
    const element = newHabouts[index];
    if(element._id === id){
    newHabouts[index].title = title;
    newHabouts[index].description = description;
    newHabouts[index].tag = tag;
    newHabouts[index].tag2 = tag2;
    break;
    }
    
  }
setHabouts(newHabouts);
}

//delete
const deleteHabout = async(id)=>{
  console.log("habout deleted" + id);

  const response = await fetch(`${host}/api/habouts/deletehabout/${id}`,{
    method : 'DELETE',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')   
     }
    // body: JSON.stringify({title,description,tag})

  });

  const json = await response.json();

 const newHabouts = habouts.filter((habout)=>{return habout._id !== id})
 setHabouts(newHabouts);

}



  
return(
     <HaboutContext.Provider value={{habouts,addHabout,editHabout,deleteHabout,getHabout}}>
        {props.children}
     </HaboutContext.Provider> 

    )

}

export default HaboutState;