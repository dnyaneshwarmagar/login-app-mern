import React from 'react'
import { useLocation } from 'react-router-dom'

const Message = () => {
  const location = useLocation();
  const {message} = location.state || "";
  return (
    <div className='container' style={{color:'green', minWidth:"300px"}}><h1>{message}</h1></div>
  )
}

export default Message