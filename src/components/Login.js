import React, { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

export default function Login() {
    const[cred,newcred]=useState({email:"",password:""})

    let navigate=useNavigate();

    const handlesubmit=async (e)=>
    {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:cred.email,password:cred.password})
          });
          const json=await response.json()
          if(json.authtoken)
          {
            //Save auth token and redirect
            localStorage.setItem('token',json.authtoken)
            navigate("/")
          }
          else{
            alert("Invalid Details")
          }
    }

    const handlechange=(e)=>
    {
        newcred({...cred,[e.target.name]:e.target.value})
    }

  return (
    <>
    <div className="container text-center">
    <h1>Login</h1>
    </div>
    <form onSubmit={handlesubmit}> 
  <div className="form-group my-4">
    <label>Email address</label>
    <input type="email" className="form-control" autoComplete="on"  id='email' name="email" value={cred.email} aria-describedby="emailHelp" onChange={handlechange} placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label >Password</label>
    <input type="password" className="form-control" id='password' autoComplete="on" name="password" value={cred.password} onChange={handlechange} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-3">Login</button>
</form>
<Link className='btn btn-primary' to="/signup" > Signup</Link>
    </>
  )
}
