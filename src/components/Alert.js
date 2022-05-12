import React from 'react'

const Alert = (props) => {
  return (
   <>

<div className="alert alert-primary" role="alert">
 This is my first MERN app {props.message}
</div>
   </>
  )
}

export default Alert
