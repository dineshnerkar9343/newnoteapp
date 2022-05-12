 import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState=(props)=>{


  const host = "http://localhost:5000"
    const noteInitial = []
const [notes, setNotes]= useState(noteInitial)

const getNote = async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YTQxYWI5NmRlMWE0M2NhMWRkMzA1In0sImlhdCI6MTY1MTEzMDkxNH0.RqKalUHoRTtFPY2gnwmaYE2ErjCySAS8aU2AQGJWucY" 
    }
  });

  const json = await response.json();
  console.log(json);
  setNotes(json)

}

//add
const addNote = async (title,description,tag)=>{
  console.log("Add note");
                         //http://localhost:5000/api/notes/addnote
  const response = await fetch(`${host}/api/notes/addnote`,{
    method : 'POST',
    headers : {
      'content-type': 'application/json',
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YTQxYWI5NmRlMWE0M2NhMWRkMzA1In0sImlhdCI6MTY1MTEzMDkxNH0.RqKalUHoRTtFPY2gnwmaYE2ErjCySAS8aU2AQGJWucY" 
    },
    body: JSON.stringify({title,description,tag})

  });

  const json = await response.json();

  const note = {
    "_id": "626a452096de1234a43ca1dd309",
    "user": "626a41ab96de1a43ca1dd305",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2022-04-28T07:41:20.721Z",
    "__v": 0
  }

setNotes(notes.concat(note))

}



//update
const editNote= async(id,title,description,tag)=>{


              //http://localhost:5000/api/notes/updatenote/626a498c96de1a43ca1dd30e
  const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
    method : 'POST',
    headers : {
      'content-type': 'application/json',
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YTQxYWI5NmRlMWE0M2NhMWRkMzA1In0sImlhdCI6MTY1MTEzMDkxNH0.RqKalUHoRTtFPY2gnwmaYE2ErjCySAS8aU2AQGJWucY" 
    },
    body: JSON.stringify({title,description,tag})

  });

  const json = response.json();
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id === id){
    element.title = title;
    element.description = description;
    element.tag = tag;
    }
    
  }

}

//delete
const deleteNote = async(id)=>{
  console.log("note deleted" + id);

  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method : 'DELETE',
    headers : {
      'content-type': 'application/json',
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2YTQxYWI5NmRlMWE0M2NhMWRkMzA1In0sImlhdCI6MTY1MTEzMDkxNH0.RqKalUHoRTtFPY2gnwmaYE2ErjCySAS8aU2AQGJWucY" 
    }
    // body: JSON.stringify({title,description,tag})

  });

  const json = await response.json();

 const newNotes = notes.filter((note)=>{return note._id !== id})
 setNotes(newNotes);

}



  
return(
     <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNote}}>
        {props.children}
     </NoteContext.Provider> 

    )

}

export default NoteState;