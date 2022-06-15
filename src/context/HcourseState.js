import React, { useState } from "react";
import HcourseContext from "./HcourseContext";


const HcourseState=(props)=>{


  const host = "http://localhost:5000"
    const hcourseInitial = []
const [hcourses, setHcourses]= useState(hcourseInitial)

//fetchhcourses
const getHcourse = async ()=>{
  const response = await fetch(`${host}/api/hcourses/fetchallhcourses`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')    
    }
  });

  const json = await response.json()
  console.log(json);
  setHcourses(json)
}

//add
const addHcourse = async (image,title,description,tag)=>{
  console.log("Add hcourse");
                         //http://localhost:5000/api/hcourses/addhcourse
  const response = await fetch(`${host}/api/hcourses/addhcourse`,{
    method : 'POST',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')   
     },
    body: JSON.stringify({image,title,description,tag})
  });

  const hcourse = await response.json();
  setHcourses(hcourses.concat(hcourse))

}

//update hcourse
const editHcourse= async(id,image,title,description,tag)=>{


              //http://localhost:5000/api/hcourses/updatehcourse/626a498c96de1a43ca1dd30e
  const response = await fetch(`${host}/api/hcourses/updatehcourse/${id}`,{
    method : 'PUT',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')    
    },
    body: JSON.stringify({image,title,description,tag})
  });
  const json = await response.json();

  let newHcourses = JSON.parse(JSON.stringify(hcourses))

  for (let index = 0; index < newHcourses.length; index++) {
    const element = newHcourses[index];
    if(element._id === id){
    newHcourses[index].image = image;    
    newHcourses[index].title = title;
    newHcourses[index].description = description;
    newHcourses[index].tag = tag;
    break;
    }
    
  }
setHcourses(newHcourses);
}

//delete
const deleteHcourse = async(id)=>{
  console.log("hcourse deleted" + id);

  const response = await fetch(`${host}/api/hcourses/deletehcourse/${id}`,{
    method : 'DELETE',
    headers : {
      'Content-Type': 'application/json',
      "auth-token": localStorage.getItem('token')   
     }
    // body: JSON.stringify({title,description,tag})

  });

  const json = await response.json();

 const newHcourses = hcourses.filter((hcourse)=>{return hcourse._id !== id})
 setHcourses(newHcourses);

}



  
return(
     <HcourseContext.Provider value={{hcourses,addHcourse,editHcourse,deleteHcourse,getHcourse}}>
        {props.children}
     </HcourseContext.Provider> 

    )

}

export default HcourseState;