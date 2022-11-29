import React from 'react'

export default function Login() {
  return (
    <div>
      <h1>Sign in</h1>
      <form method="POST" action="/login">
        <div >
          <h4>Email: </h4>
          <input type="email" name="email" placeholder="Email" />
        </div>
        <div >
          <h4>Password: </h4>
          <input type="password"  name="password" placeholder="Password"  />
        </div>
        <div >
          <button type="submit" >Login</button>
        
      </div>
    </form> 
    </div>
  )
}
