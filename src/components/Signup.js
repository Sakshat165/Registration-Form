import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'

export default function Signup() {

  const[cred,newcred]=useState({name:"",email:"",password:""})
  let navigate=useNavigate();

  const handlesubmit=async (e)=>
  {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name:cred.name,email:cred.email,password:cred.password})
        });
        newcred({name:"",email:"",password:""})
        const json=await response.json()
          if(json.authtoken)
          {
            //Save auth token and redirect
            localStorage.setItem('token',json.authtoken)
            navigate("/login")
          }
  }

  const handlechange=(e)=>
  {
      newcred({...cred,[e.target.name]:e.target.value})
  }

  return (
    <>
    <div className="container text-center">
    <h1>Signup</h1>
    </div>
    <form onSubmit={handlesubmit}>
    <div className="form-group my-4">
    <label>Name</label>
    <input type="text" className="form-control" id='name' name='name' autoComplete="on" aria-describedby="emailHelp" value={cred.name} onChange={handlechange} placeholder="Enter name"/>
  </div>
  <div className="form-group my-4">
    <label >Email address</label>
    <input type="email" className="form-control" id='email' name='email' autoComplete="on" aria-describedby="emailHelp" value={cred.email} onChange={handlechange} placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label >Password</label>
    <input type="password" className="form-control" id='password' name='password' autoComplete="on" value={cred.password} onChange={handlechange} placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary my-3">Signup</button>
</form>
<Link className='btn btn-primary' to="/login" > Login</Link>
    </>
  )
}
