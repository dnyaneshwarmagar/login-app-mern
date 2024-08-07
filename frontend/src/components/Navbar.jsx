import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/signup" className="no-underline">
        <b>Signup</b>
      </Link>
      <br />
      <br />
      <Link to="/login" className="no-underline">
        <b>Login</b>
      </Link>
      <Link to="/forgot" className="no-underline">
        <b>Forget Password</b>
      </Link>
    </div>
  )
}

export default Navbar