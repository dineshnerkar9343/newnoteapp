import React from 'react'

const Login = () => {

    const handleSubmit = () =>{
        // const response = await fetch(`http://localhost:5000/api/auth/login`,{
        //     method : 'POST',
        //     headers : {
        //       'content-type': 'application/json',
        //     },
        //     body: JSON.stringify({title,description,tag})
        //   });
        
        //   const note = await response.json();
        //   setNotes(notes.concat(note))
        
    }

  return (
    <>
    <div className="container">
        <h2>Login</h2>
        <h5>Welcome Back</h5>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        
        <button type="submit" className="btn btn-outline-dark">Login</button>
      </form>
    </div>
    </>
  )
}

export default Login