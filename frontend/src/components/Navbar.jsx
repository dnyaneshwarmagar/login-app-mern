import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to="/signup">
        <b>Signup</b>
      </Link>
      <br />
      <br />
      <Link to="/login">
        <b>Login</b>
      </Link>
      <Link to="/forgot">
        <b>Forget Password</b>
      </Link>
    </div>
  )
}

export default Navbar