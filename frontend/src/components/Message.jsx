import React from 'react'
import { useLocation } from 'react-router-dom'

const Message = () => {
  const location = useLocation();
  const {message} = location.state || "";
  return (
    <div className='container'><h1>{message}</h1></div>
  )
}

export default Message