import React from 'react'

const Signup = () => {
  return (
    <>
 <div className="container">
     <h2>SignUp</h2>
     <h5>Welcome</h5>
    <form>
    <div className="mb-3">
          <label htmlFor="username" className="form-label">Name</label>
          <input type="text" className="form-control" id="username" />
        </div>
        
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        
        <button type="submit" className="btn btn-outline-dark">Signup</button>
      </form>
    </div>
    </>
  )
}

export default Signup